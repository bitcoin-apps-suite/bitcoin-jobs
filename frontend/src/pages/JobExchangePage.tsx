import React, { useState } from 'react';
import './JobExchangePage.css';

// Types for the 3 pillars of the job marketplace
interface DeveloperToken {
  id: string;
  ticker: string;
  name: string;
  totalSupply: string;
  currentPrice: number;
  change24h: number;
  marketCap: number;
  description: string;
}

interface Team {
  id: string;
  name: string;
  ticker: string;
  totalTokens: string;
  hourlyRate: number;
  description: string;
  website?: string;
  blockchain?: string;
  skills: string[];
  corporateInfo?: {
    legalName: string;
    gstNumber: string;
    coi: string;
  };
  stats: {
    projectsCompleted: number;
    clientSatisfaction: number;
    avgResponseTime: string;
  };
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
    tokens?: string;
  };
  description: string;
  requirements: string[];
  perks: string[];
  kpis: string[];
  targets: string[];
  posted: Date;
  urgent?: boolean;
}

interface Contract {
  id: string;
  title: string;
  description: string;
  reward: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  estimatedTime: string;
  issueNumber?: string;
  deadline?: string;
  assignee?: string;
  urgent?: boolean;
}

interface JobBid {
  id: string;
  jobId: string;
  bidderName: string;
  bidAmount: number;
  currency: string;
  estimatedCompletion: string;
  proposal: string;
  timestamp: Date;
}

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
  type: 'buy' | 'sell';
}

const JobExchangePage: React.FC<{
  isAuthenticated: boolean;
  currentUser: any;
  onLogout: () => void;
}> = ({ isAuthenticated, currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'jobs' | 'exchange'>('tasks');
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [orderBook, setOrderBook] = useState<{ buy: OrderBookEntry[], sell: OrderBookEntry[] }>({
    buy: [],
    sell: []
  });

  // Sample data for TechSteck and other teams
  const teams: Team[] = [
    {
      id: 'techsteck-1',
      name: 'TechSteck',
      ticker: '$TSTECK',
      totalTokens: '1,000,000,000',
      hourlyRate: 100,
      description: 'Premium blockchain development and consulting services',
      website: 'https://techsteck.com/',
      blockchain: 'https://blockchain.techsteck.com/',
      skills: ['Blockchain Development', 'Smart Contracts', 'DeFi', 'Web3', 'React', 'Node.js'],
      corporateInfo: {
        legalName: 'TECHSTECK SOLUTIONS LLP',
        gstNumber: '06AARFT8374R1ZW',
        coi: 'AAX-7735'
      },
      stats: {
        projectsCompleted: 127,
        clientSatisfaction: 4.9,
        avgResponseTime: '2 hours'
      }
    },
    {
      id: 'bitcoin-devs-1',
      name: 'Bitcoin Core Devs',
      ticker: '$BTCDEV',
      totalTokens: '500,000,000',
      hourlyRate: 150,
      description: 'Core Bitcoin protocol development and security auditing',
      skills: ['Bitcoin Core', 'C++', 'Cryptography', 'Security Audits', 'Protocol Design'],
      stats: {
        projectsCompleted: 89,
        clientSatisfaction: 4.8,
        avgResponseTime: '4 hours'
      }
    }
  ];

  const contracts: Contract[] = [
    {
      id: 'contract-1',
      title: 'Implement HandCash Integration',
      description: 'Add HandCash wallet integration to the job marketplace for seamless Bitcoin payments',
      reward: '25,000 $BJOBS',
      status: 'open',
      difficulty: 'intermediate',
      estimatedTime: '2-3 days',
      issueNumber: '42',
      deadline: '2025-01-15'
    },
    {
      id: 'contract-2', 
      title: 'Build Token Exchange UI',
      description: 'Create a professional trading interface for team tokens with order book and charts',
      reward: '50,000 $BJOBS',
      status: 'open',
      difficulty: 'expert',
      estimatedTime: '1 week',
      issueNumber: '38'
    },
    {
      id: 'contract-3',
      title: 'Mobile App Development',
      description: 'Develop React Native mobile app for the job marketplace',
      reward: '100,000 $BJOBS',
      status: 'in-progress',
      difficulty: 'expert',
      estimatedTime: '3 weeks',
      assignee: 'TechSteck'
    }
  ];

  const jobListings: JobListing[] = [
    {
      id: 'job-1',
      title: 'Senior Blockchain Developer',
      company: 'TechSteck',
      location: 'Remote',
      type: 'full-time',
      salary: {
        min: 120000,
        max: 180000,
        currency: 'USD',
        tokens: '10,000 $TSTECK/month'
      },
      description: 'Lead blockchain development projects and mentor junior developers',
      requirements: ['5+ years blockchain experience', 'Solidity expertise', 'DeFi protocols'],
      perks: ['Remote work', 'Token equity', 'Health insurance', 'Learning budget'],
      kpis: ['Deploy 2+ smart contracts monthly', 'Code review turnaround < 24h', 'Team mentoring score > 4.5'],
      targets: ['Build scalable DeFi protocols', 'Increase platform TVL by 50%', 'Launch 3 new features per quarter'],
      posted: new Date('2025-01-10'),
      urgent: true
    },
    {
      id: 'job-2',
      title: 'Full Stack Engineer',
      company: 'Bitcoin Core Devs',
      location: 'Remote',
      type: 'contract',
      salary: {
        min: 80000,
        max: 120000,
        currency: 'USD',
        tokens: '5,000 $BTCDEV/month'
      },
      description: 'Build and maintain Bitcoin-based applications and tools',
      requirements: ['React/Node.js experience', 'Bitcoin protocol knowledge', 'API development'],
      perks: ['Flexible hours', 'Bitcoin payments', 'Conference attendance'],
      kpis: ['Ship features on schedule', 'Bug fix response < 2 days', 'API uptime > 99.9%'],
      targets: ['Develop Bitcoin wallet integrations', 'Optimize transaction processing', 'Build developer tools'],
      posted: new Date('2025-01-08')
    }
  ];

  const developerTokens: DeveloperToken[] = [
    {
      id: 'tsteck',
      ticker: '$TSTECK',
      name: 'TechSteck Token',
      totalSupply: '1,000,000,000',
      currentPrice: 0.10,
      change24h: +5.2,
      marketCap: 100000000,
      description: 'Represents compute time and expertise from TechSteck development team'
    },
    {
      id: 'btcdev',
      ticker: '$BTCDEV',
      name: 'Bitcoin Dev Token',
      totalSupply: '500,000,000',
      currentPrice: 0.15,
      change24h: -2.1,
      marketCap: 75000000,
      description: 'Access to Bitcoin Core development services and protocol expertise'
    }
  ];

  return (
    <div className="job-exchange-page">
      <div className="job-exchange-container">
        <header className="exchange-header">
          <h1>Bitcoin Jobs Exchange</h1>
          <p>Decentralized marketplace for blockchain talent, projects, and token-based work</p>
          
          <nav className="exchange-nav">
            <button 
              className={activeTab === 'tasks' ? 'active' : ''}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks & Contracts
            </button>
            <button 
              className={activeTab === 'jobs' ? 'active' : ''}
              onClick={() => setActiveTab('jobs')}
            >
              Careers & Jobs
            </button>
            <button 
              className={activeTab === 'exchange' ? 'active' : ''}
              onClick={() => setActiveTab('exchange')}
            >
              Token Exchange
            </button>
          </nav>
        </header>

        {/* Pillar 1: Tasks, Issues & Contracts */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>Development Contracts & Issues</h2>
              <p>Complete tasks and earn tokens upon successful delivery</p>
            </div>
            
            <div className="contracts-grid">
              {contracts.map((contract) => (
                <div key={contract.id} className={`contract-card ${contract.status} ${contract.urgent ? 'urgent' : ''}`}>
                  <div className="contract-header">
                    <h3>{contract.title}</h3>
                    <span className={`status-badge ${contract.status}`}>{contract.status.replace('-', ' ')}</span>
                  </div>
                  
                  <p className="contract-description">{contract.description}</p>
                  
                  <div className="contract-details">
                    <div className="detail-item">
                      <span className="label">Reward:</span>
                      <span className="value reward">{contract.reward}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Difficulty:</span>
                      <span className={`value difficulty ${contract.difficulty}`}>{contract.difficulty}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Time Est:</span>
                      <span className="value">{contract.estimatedTime}</span>
                    </div>
                    {contract.issueNumber && (
                      <div className="detail-item">
                        <span className="label">Issue:</span>
                        <span className="value">#{contract.issueNumber}</span>
                      </div>
                    )}
                    {contract.deadline && (
                      <div className="detail-item">
                        <span className="label">Deadline:</span>
                        <span className="value deadline">{new Date(contract.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="contract-actions">
                    {contract.status === 'open' && (
                      <button className="btn-primary">Apply for Contract</button>
                    )}
                    {contract.status === 'in-progress' && contract.assignee && (
                      <div className="assignee">Assigned to: <strong>{contract.assignee}</strong></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pillar 2: Roles, Careers & Jobs */}
        {activeTab === 'jobs' && (
          <div className="jobs-section">
            <div className="section-header">
              <h2>Career Opportunities</h2>
              <p>Full-time roles, contracts, and remote positions with token equity</p>
            </div>
            
            <div className="jobs-grid">
              {jobListings.map((job) => (
                <div key={job.id} className={`job-card ${job.urgent ? 'urgent' : ''}`}>
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <div className="job-meta">
                      <span className="company">{job.company}</span>
                      <span className="location">{job.location}</span>
                      <span className={`job-type ${job.type}`}>{job.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="salary-section">
                    <div className="salary-range">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                    </div>
                    {job.salary.tokens && (
                      <div className="token-equity">+ {job.salary.tokens}</div>
                    )}
                  </div>
                  
                  <p className="job-description">{job.description}</p>
                  
                  <div className="job-details">
                    <div className="requirements">
                      <h4>Requirements:</h4>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="perks">
                      <h4>Perks:</h4>
                      <ul>
                        {job.perks.map((perk, index) => (
                          <li key={index}>{perk}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="kpis">
                      <h4>Key Performance Indicators:</h4>
                      <ul>
                        {job.kpis.map((kpi, index) => (
                          <li key={index}>{kpi}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="targets">
                      <h4>Success Targets:</h4>
                      <ul>
                        {job.targets.map((target, index) => (
                          <li key={index}>{target}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="job-footer">
                    <span className="posted-date">Posted {job.posted.toLocaleDateString()}</span>
                    <button className="btn-primary">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pillar 3: Token Exchange */}
        {activeTab === 'exchange' && (
          <div className="exchange-section">
            <div className="section-header">
              <h2>Team Token Exchange</h2>
              <p>Trade team equity tokens representing compute time, expertise, and AI services</p>
            </div>
            
            <div className="exchange-layout">
              <div className="teams-sidebar">
                <h3>Development Teams</h3>
                {teams.map((team) => (
                  <div key={team.id} className="team-card">
                    <div className="team-header">
                      <h4>{team.name}</h4>
                      <span className="ticker">{team.ticker}</span>
                    </div>
                    
                    <div className="team-stats">
                      <div className="stat">
                        <span className="label">Rate:</span>
                        <span className="value">${team.hourlyRate}/hr</span>
                      </div>
                      <div className="stat">
                        <span className="label">Projects:</span>
                        <span className="value">{team.stats.projectsCompleted}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Rating:</span>
                        <span className="value">{team.stats.clientSatisfaction}/5</span>
                      </div>
                    </div>
                    
                    <div className="team-skills">
                      {team.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    
                    {team.corporateInfo && (
                      <div className="corporate-info">
                        <h5>Corporate Details:</h5>
                        <p><strong>{team.corporateInfo.legalName}</strong></p>
                        <p>GST: {team.corporateInfo.gstNumber}</p>
                        <p>COI: {team.corporateInfo.coi}</p>
                      </div>
                    )}
                    
                    <div className="team-links">
                      {team.website && (
                        <a href={team.website} target="_blank" rel="noopener noreferrer">Website</a>
                      )}
                      {team.blockchain && (
                        <a href={team.blockchain} target="_blank" rel="noopener noreferrer">Blockchain</a>
                      )}
                    </div>
                    
                    <button 
                      className="btn-secondary"
                      onClick={() => setSelectedToken(team.ticker)}
                    >
                      Trade {team.ticker}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="tokens-main">
                <div className="tokens-grid">
                  {developerTokens.map((token) => (
                    <div key={token.id} className="token-card">
                      <div className="token-header">
                        <h4>{token.ticker}</h4>
                        <span className="token-name">{token.name}</span>
                      </div>
                      
                      <div className="token-price">
                        <span className="price">${token.currentPrice.toFixed(4)}</span>
                        <span className={`change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div className="token-stats">
                        <div className="stat">
                          <span className="label">Market Cap:</span>
                          <span className="value">${(token.marketCap / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="stat">
                          <span className="label">Supply:</span>
                          <span className="value">{(parseInt(token.totalSupply) / 1000000).toFixed(0)}M</span>
                        </div>
                      </div>
                      
                      <p className="token-description">{token.description}</p>
                      
                      <div className="token-actions">
                        <button className="btn-buy">Buy</button>
                        <button className="btn-sell">Sell</button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedToken && (
                  <div className="trading-interface">
                    <h3>Trading {selectedToken}</h3>
                    <div className="order-book">
                      <div className="buy-orders">
                        <h4>Buy Orders</h4>
                        {/* Order book implementation */}
                      </div>
                      <div className="sell-orders">
                        <h4>Sell Orders</h4>
                        {/* Order book implementation */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobExchangePage;