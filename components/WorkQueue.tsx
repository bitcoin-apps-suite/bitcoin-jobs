import React, { useState, useEffect } from 'react';
import './WorkQueue.css';

// Contract types for different app domains
export type ContractType = 
  | 'development'   // Code contracts
  | 'writing'       // Content creation
  | 'design'        // UI/UX design
  | 'video'         // Video editing
  | 'music'         // Audio production
  | 'data'          // Data entry/analysis
  | 'translation'   // Language translation
  | 'testing'       // QA testing
  | 'research'      // Research tasks
  | 'moderation';   // Content moderation

export interface Contract {
  id: string;
  title: string;
  description: string;
  app: string; // Which app this contract is for (bitcoin-writer, bitcoin-code, etc.)
  type: ContractType;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  compensation: {
    amount: number; // In USD
    currency: 'USD' | 'BSV';
    equity: number; // Percentage (0.01 = 0.01%)
  };
  timeEstimate: {
    min: number; // Hours
    max: number;
  };
  deadline: string; // ISO date
  requirements: string[];
  deliverables: string[];
  status: 'available' | 'accepted' | 'in_progress' | 'review' | 'completed' | 'expired';
  acceptedBy?: string;
  acceptedAt?: string;
  completedAt?: string;
  githubIssue?: string;
  pullRequest?: string;
  publishedAt: string;
  tags: string[];
}

interface WorkQueueProps {
  userId?: string;
  isAuthenticated?: boolean;
  onAcceptContract: (contract: Contract) => void;
  contractType?: ContractType; // Filter by type if in specific app
  appName?: string; // Filter by app if needed
}

const WorkQueue: React.FC<WorkQueueProps> = ({
  userId,
  isAuthenticated = false,
  onAcceptContract,
  contractType,
  appName
}) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'my-contracts' | 'by-app' | 'by-type'>('available');
  const [typeFilter, setTypeFilter] = useState<ContractType | 'all'>('all');
  const [appFilter, setAppFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  // Mock contract data - in production this would come from blockchain/API
  const mockContracts: Contract[] = [
    // Development Contracts
    {
      id: 'BC-AI-003',
      title: 'Add OpenAI API Integration Component',
      description: 'Create a reusable component for OpenAI API integration in bitcoin-ai app. Should handle authentication, rate limiting, and response streaming.',
      app: 'bitcoin-ai',
      type: 'development',
      difficulty: 'intermediate',
      compensation: { amount: 40, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 2, max: 4 },
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      requirements: ['React/TypeScript', 'API integration experience', 'OpenAI API knowledge'],
      deliverables: ['Working component', 'Unit tests', 'Documentation'],
      status: 'available',
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-contracts/issues/2#BC-AI-003',
      publishedAt: new Date().toISOString(),
      tags: ['React', 'API', 'AI']
    },
    {
      id: 'BC-3D-001',
      title: 'Add Orbit Controls for 3D Scene',
      description: 'Implement orbit controls component for Three.js scene navigation in bitcoin-3d app.',
      app: 'bitcoin-3d',
      type: 'development',
      difficulty: 'beginner',
      compensation: { amount: 20, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 1, max: 2 },
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      requirements: ['Three.js', 'JavaScript', 'Basic 3D concepts'],
      deliverables: ['Orbit controls component', 'Integration with existing scene'],
      status: 'available',
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-contracts/issues/2#BC-3D-001',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      tags: ['Three.js', '3D', 'Graphics']
    },
    {
      id: 'BC-EX-007',
      title: 'Add Dark/Light Theme Toggle',
      description: 'Implement theme switching functionality for bitcoin-exchange with persistent storage.',
      app: 'bitcoin-exchange',
      type: 'development',
      difficulty: 'beginner',
      compensation: { amount: 20, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 1, max: 2 },
      deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      requirements: ['CSS', 'React', 'LocalStorage'],
      deliverables: ['Theme toggle component', 'CSS variables', 'Persistence'],
      status: 'available',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      tags: ['UI', 'CSS', 'React']
    },
    // Writing Contracts
    {
      id: 'DOC-001',
      title: 'Write Bitcoin-AI Documentation',
      description: 'Create comprehensive user documentation for the bitcoin-ai app, including setup, features, and API reference.',
      app: 'bitcoin-ai',
      type: 'writing',
      difficulty: 'intermediate',
      compensation: { amount: 30, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 3, max: 5 },
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: ['Technical writing', 'AI/ML knowledge', 'Markdown'],
      deliverables: ['User guide', 'API documentation', 'Examples'],
      status: 'available',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      tags: ['Documentation', 'Writing', 'AI']
    },
    // Design Contracts
    {
      id: 'UI-001',
      title: 'Design Bitcoin-Gaming Logo',
      description: 'Create a professional logo for the bitcoin-gaming app that incorporates gaming and Bitcoin elements.',
      app: 'bitcoin-gaming',
      type: 'design',
      difficulty: 'intermediate',
      compensation: { amount: 35, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 2, max: 4 },
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: ['Logo design', 'Vector graphics', 'Brand understanding'],
      deliverables: ['SVG logo', 'PNG exports', 'Brand guidelines'],
      status: 'available',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      tags: ['Design', 'Logo', 'Branding']
    },
    // Testing Contract
    {
      id: 'QA-001',
      title: 'Test Bitcoin-Exchange Trading Features',
      description: 'Comprehensive testing of trading features including order placement, cancellation, and portfolio tracking.',
      app: 'bitcoin-exchange',
      type: 'testing',
      difficulty: 'intermediate',
      compensation: { amount: 25, currency: 'USD', equity: 0.01 },
      timeEstimate: { min: 2, max: 3 },
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: ['QA experience', 'Trading knowledge', 'Bug reporting'],
      deliverables: ['Test report', 'Bug list', 'Test cases'],
      status: 'available',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      tags: ['Testing', 'QA', 'Trading']
    }
  ];

  useEffect(() => {
    loadContracts();
    // Update timer every minute
    const interval = setInterval(updateTimers, 60000);
    return () => clearInterval(interval);
  }, [filter, typeFilter, appFilter, difficultyFilter]);

  useEffect(() => {
    updateTimers();
  }, [contracts]);

  const updateTimers = () => {
    const timers: Record<string, string> = {};
    contracts.forEach(contract => {
      if (contract.status === 'accepted' || contract.status === 'in_progress') {
        timers[contract.id] = formatTimeRemaining(contract.deadline);
      }
    });
    setTimeLeft(timers);
  };

  const loadContracts = async () => {
    setIsLoading(true);
    try {
      // In production, fetch from blockchain/API
      let filteredContracts = [...mockContracts];

      // Apply filters
      if (filter === 'available') {
        filteredContracts = filteredContracts.filter(c => c.status === 'available');
      } else if (filter === 'my-contracts' && userId) {
        filteredContracts = filteredContracts.filter(c => c.acceptedBy === userId);
      }

      if (typeFilter !== 'all') {
        filteredContracts = filteredContracts.filter(c => c.type === typeFilter);
      }

      if (appFilter !== 'all') {
        filteredContracts = filteredContracts.filter(c => c.app === appFilter);
      }

      if (difficultyFilter !== 'all') {
        filteredContracts = filteredContracts.filter(c => c.difficulty === difficultyFilter);
      }

      // If component is used in specific app context
      if (contractType) {
        filteredContracts = filteredContracts.filter(c => c.type === contractType);
      }
      if (appName) {
        filteredContracts = filteredContracts.filter(c => c.app === appName);
      }

      setContracts(filteredContracts);
    } catch (error) {
      console.error('Failed to load contracts:', error);
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCompensation = (comp: Contract['compensation']) => {
    const base = comp.currency === 'USD' ? `$${comp.amount}` : `${comp.amount} BSV`;
    return `${base} + ${comp.equity}% equity`;
  };

  const formatTimeEstimate = (time: Contract['timeEstimate']) => {
    if (time.min === time.max) {
      return `${time.min} hour${time.min > 1 ? 's' : ''}`;
    }
    return `${time.min}-${time.max} hours`;
  };

  const formatTimeRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    
    if (diff < 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours < 1) return `${minutes}m remaining`;
    if (hours < 24) return `${hours}h ${minutes}m remaining`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h remaining`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'expert': return '#F44336';
      default: return '#999';
    }
  };

  const getTypeIcon = (type: ContractType) => {
    const icons: Record<ContractType, string> = {
      development: '💻',
      writing: '✍️',
      design: '🎨',
      video: '🎬',
      music: '🎵',
      data: '📊',
      translation: '🌐',
      testing: '🧪',
      research: '🔬',
      moderation: '👁️'
    };
    return icons[type] || '📋';
  };

  const handleAcceptContract = (contract: Contract) => {
    if (!isAuthenticated) {
      alert('Please sign in to accept contracts');
      return;
    }

    const confirmMsg = `
Accept contract: "${contract.title}"?

Compensation: ${formatCompensation(contract.compensation)}
Time Estimate: ${formatTimeEstimate(contract.timeEstimate)}
Deadline: ${formatTimeRemaining(contract.deadline)}

By accepting, you commit to completing this contract within the deadline.
    `.trim();

    if (window.confirm(confirmMsg)) {
      onAcceptContract(contract);
      // Start timer animation
      setSelectedContract(null);
      // In production, this would update blockchain state
    }
  };

  const getAppColor = (app: string) => {
    // Use consistent colors for each app
    const colors: Record<string, string> = {
      'bitcoin-ai': '#9333EA',
      'bitcoin-3d': '#06B6D4',
      'bitcoin-exchange': '#10B981',
      'bitcoin-gaming': '#F59E0B',
      'bitcoin-writer': '#3B82F6',
      'bitcoin-music': '#EC4899',
      'bitcoin-video': '#EF4444',
      'bitcoin-art': '#8B5CF6'
    };
    return colors[app] || '#6B7280';
  };

  return (
    <div className="work-queue-container">
      <div className="queue-header">
        <h2 className="queue-title">
          <span className="bitcoin-orange">Contract</span> Queue
        </h2>
        <div className="queue-stats">
          <span className="stat-item">
            <span className="stat-value">{contracts.filter(c => c.status === 'available').length}</span>
            <span className="stat-label">Available</span>
          </span>
          <span className="stat-item">
            <span className="stat-value">${contracts.filter(c => c.status === 'available').reduce((sum, c) => sum + c.compensation.amount, 0)}</span>
            <span className="stat-label">Total Value</span>
          </span>
        </div>
      </div>

      <div className="queue-filters">
        <div className="filter-row">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          {isAuthenticated && (
            <button 
              className={`filter-btn ${filter === 'my-contracts' ? 'active' : ''}`}
              onClick={() => setFilter('my-contracts')}
            >
              My Contracts
            </button>
          )}
        </div>

        <div className="filter-row">
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ContractType | 'all')}
          >
            <option value="all">All Types</option>
            <option value="development">💻 Development</option>
            <option value="writing">✍️ Writing</option>
            <option value="design">🎨 Design</option>
            <option value="testing">🧪 Testing</option>
            <option value="video">🎬 Video</option>
            <option value="music">🎵 Music</option>
          </select>

          <select 
            className="filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">🟢 Beginner</option>
            <option value="intermediate">🟡 Intermediate</option>
            <option value="expert">🔴 Expert</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="queue-loading">
          <div className="loading-spinner"></div>
          <p>Loading contracts...</p>
        </div>
      ) : contracts.length === 0 ? (
        <div className="queue-empty">
          <p>No contracts available matching your filters.</p>
          <p>Check back soon or adjust your filters!</p>
        </div>
      ) : (
        <div className="contract-list">
          {contracts.map(contract => (
            <div 
              key={contract.id} 
              className={`contract-item ${selectedContract?.id === contract.id ? 'selected' : ''} ${contract.status !== 'available' ? 'accepted' : ''}`}
              onClick={() => setSelectedContract(contract)}
            >
              <div className="contract-header">
                <div className="contract-title-row">
                  <span className="contract-type-icon">{getTypeIcon(contract.type)}</span>
                  <h4 className="contract-title">{contract.title}</h4>
                </div>
                <div className="contract-compensation">
                  <span className="compensation-amount">${contract.compensation.amount}</span>
                  <span className="compensation-equity">+{contract.compensation.equity}%</span>
                </div>
              </div>
              
              <div className="contract-meta">
                <span 
                  className="contract-app"
                  style={{ color: getAppColor(contract.app) }}
                >
                  {contract.app}
                </span>
                <span 
                  className="contract-difficulty"
                  style={{ color: getDifficultyColor(contract.difficulty) }}
                >
                  {contract.difficulty}
                </span>
                <span className="contract-time">
                  ⏱️ {formatTimeEstimate(contract.timeEstimate)}
                </span>
                {contract.status === 'in_progress' && timeLeft[contract.id] && (
                  <span className="contract-timer urgent">
                    ⏰ {timeLeft[contract.id]}
                  </span>
                )}
              </div>

              {selectedContract?.id === contract.id && (
                <div className="contract-details">
                  <p className="contract-description">{contract.description}</p>
                  
                  <div className="contract-section">
                    <strong>Requirements:</strong>
                    <ul className="requirement-list">
                      {contract.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="contract-section">
                    <strong>Deliverables:</strong>
                    <ul className="deliverable-list">
                      {contract.deliverables.map((del, idx) => (
                        <li key={idx}>{del}</li>
                      ))}
                    </ul>
                  </div>

                  {contract.tags.length > 0 && (
                    <div className="contract-tags">
                      {contract.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  {contract.githubIssue && (
                    <div className="contract-links">
                      <a 
                        href={contract.githubIssue} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        View on GitHub →
                      </a>
                    </div>
                  )}

                  <div className="contract-actions">
                    {contract.status === 'available' ? (
                      <button 
                        className="accept-contract-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptContract(contract);
                        }}
                      >
                        Accept Contract (${contract.compensation.amount})
                      </button>
                    ) : contract.status === 'in_progress' && contract.acceptedBy === userId ? (
                      <button className="working-btn" disabled>
                        In Progress... {timeLeft[contract.id]}
                      </button>
                    ) : (
                      <button className="unavailable-btn" disabled>
                        {contract.status === 'completed' ? 'Completed' : 'Unavailable'}
                      </button>
                    )}
                    <button 
                      className="details-close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContract(null);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkQueue;