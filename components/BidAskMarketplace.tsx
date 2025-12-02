import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Shield, TrendingUp, Users, Award, AlertCircle } from 'lucide-react';

export interface JobListing {
  id: string;
  title: string;
  description: string;
  client: {
    address: string;
    name: string;
    rating: number;
    completedJobs: number;
  };
  budget: {
    min: number;
    max: number;
    currency: 'BSV' | 'USD';
    escrowDeposited: boolean;
  };
  timeline: {
    posted: string;
    deadline: string;
    estimatedHours: number;
  };
  requirements: string[];
  milestones: {
    title: string;
    description: string;
    percentage: number; // % of total budget
  }[];
  bids: Bid[];
  status: 'open' | 'in_progress' | 'completed' | 'disputed' | 'cancelled';
  category: string;
  skills: string[];
}

export interface Bid {
  id: string;
  freelancer: {
    address: string;
    name: string;
    rating: number;
    completedJobs: number;
    skills: string[];
  };
  amount: number;
  currency: 'BSV' | 'USD';
  timeline: number; // days
  proposal: string;
  milestoneProposal?: {
    milestoneId: string;
    amount: number;
    timeline: number;
  }[];
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

interface BidAskMarketplaceProps {
  userAddress?: string;
  userType?: 'client' | 'freelancer';
}

const BidAskMarketplace: React.FC<BidAskMarketplaceProps> = ({ userAddress, userType }) => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidTimeline, setBidTimeline] = useState('');
  const [bidProposal, setBidProposal] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'my-jobs' | 'my-bids'>('open');

  // Mock data - would come from blockchain
  useEffect(() => {
    const mockJobs: JobListing[] = [
      {
        id: 'job-001',
        title: 'Build DEX Trading Interface',
        description: 'Create a decentralized exchange interface with real-time order book, trading charts, and wallet integration.',
        client: {
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          name: 'CryptoTrader',
          rating: 4.8,
          completedJobs: 12
        },
        budget: {
          min: 500,
          max: 1000,
          currency: 'USD',
          escrowDeposited: true
        },
        timeline: {
          posted: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedHours: 40
        },
        requirements: [
          'React/TypeScript experience',
          'Web3 integration',
          'Trading interface design',
          'Real-time data handling'
        ],
        milestones: [
          { title: 'UI Design & Mockups', description: 'Complete interface designs', percentage: 20 },
          { title: 'Core Trading Features', description: 'Order placement, cancellation', percentage: 40 },
          { title: 'Charts & Analytics', description: 'Trading charts integration', percentage: 25 },
          { title: 'Testing & Deployment', description: 'Full testing suite', percentage: 15 }
        ],
        bids: [
          {
            id: 'bid-001',
            freelancer: {
              address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
              name: 'BlockchainDev',
              rating: 4.9,
              completedJobs: 45,
              skills: ['React', 'Web3', 'TypeScript']
            },
            amount: 750,
            currency: 'USD',
            timeline: 10,
            proposal: 'I have extensive experience building DEX interfaces...',
            submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          },
          {
            id: 'bid-002',
            freelancer: {
              address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
              name: 'CryptoUI',
              rating: 4.7,
              completedJobs: 28,
              skills: ['UI/UX', 'React', 'Trading']
            },
            amount: 850,
            currency: 'USD',
            timeline: 12,
            proposal: 'Specialized in trading interfaces with 5+ years experience...',
            submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: 'pending'
          }
        ],
        status: 'open',
        category: 'Development',
        skills: ['React', 'TypeScript', 'Web3', 'Trading']
      },
      {
        id: 'job-002',
        title: 'Smart Contract Audit',
        description: 'Security audit for DeFi protocol smart contracts on BSV.',
        client: {
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          name: 'DeFiProtocol',
          rating: 4.9,
          completedJobs: 8
        },
        budget: {
          min: 1000,
          max: 2000,
          currency: 'USD',
          escrowDeposited: true
        },
        timeline: {
          posted: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedHours: 20
        },
        requirements: [
          'Smart contract security expertise',
          'BSV/Bitcoin Script knowledge',
          'Previous audit experience',
          'Security certification preferred'
        ],
        milestones: [
          { title: 'Initial Review', description: 'Code review and analysis', percentage: 30 },
          { title: 'Vulnerability Testing', description: 'Comprehensive testing', percentage: 40 },
          { title: 'Audit Report', description: 'Detailed findings report', percentage: 30 }
        ],
        bids: [],
        status: 'open',
        category: 'Security',
        skills: ['Smart Contracts', 'Security', 'BSV', 'Auditing']
      }
    ];
    
    setJobs(mockJobs);
  }, []);

  const submitBid = async () => {
    if (!selectedJob || !bidAmount || !bidTimeline || !bidProposal) return;
    
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      freelancer: {
        address: userAddress || 'demo-address',
        name: 'CurrentUser',
        rating: 0,
        completedJobs: 0,
        skills: []
      },
      amount: parseFloat(bidAmount),
      currency: selectedJob.budget.currency,
      timeline: parseInt(bidTimeline),
      proposal: bidProposal,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // In production: Submit to blockchain
    console.log('Submitting bid to blockchain:', newBid);
    
    // Update local state
    selectedJob.bids.push(newBid);
    setJobs([...jobs]);
    setShowBidModal(false);
    resetBidForm();
  };
  
  const acceptBid = async (jobId: string, bidId: string) => {
    // In production: Create escrow contract on blockchain
    console.log(`Accepting bid ${bidId} for job ${jobId}`);
    alert('Escrow contract will be created and funds locked. Freelancer will be notified.');
  };
  
  const resetBidForm = () => {
    setBidAmount('');
    setBidTimeline('');
    setBidProposal('');
  };

  return (
    <div className="bid-ask-marketplace">
      {/* Header */}
      <div className="marketplace-header">
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-turquoise">Decentralized</span> Job Marketplace
        </h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-turquoise text-black' : 'bg-gray-800 text-gray-300'}`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-4 py-2 rounded-lg ${filter === 'open' ? 'bg-turquoise text-black' : 'bg-gray-800 text-gray-300'}`}
          >
            Open for Bids
          </button>
          <button
            onClick={() => setFilter('my-jobs')}
            className={`px-4 py-2 rounded-lg ${filter === 'my-jobs' ? 'bg-turquoise text-black' : 'bg-gray-800 text-gray-300'}`}
          >
            My Jobs
          </button>
          <button
            onClick={() => setFilter('my-bids')}
            className={`px-4 py-2 rounded-lg ${filter === 'my-bids' ? 'bg-turquoise text-black' : 'bg-gray-800 text-gray-300'}`}
          >
            My Bids
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="job-card bg-gray-900 border border-gray-800 rounded-lg p-6">
            {/* Job Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.description}</p>
              </div>
              {job.budget.escrowDeposited && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-900/30 border border-green-600 rounded">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500">Escrow</span>
                </div>
              )}
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-turquoise" />
                <span className="text-white">
                  ${job.budget.min} - ${job.budget.max}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-gray-300">
                  {Math.ceil((new Date(job.timeline.deadline).getTime() - Date.now()) / (24 * 60 * 60 * 1000))} days
                </span>
              </div>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">{job.client.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-400">{job.client.rating}/5</span>
              </div>
              <div className="text-gray-500">
                {job.client.completedJobs} jobs completed
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Milestones:</div>
              <div className="space-y-1">
                {job.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-300">{milestone.title}</span>
                    <span className="text-turquoise">{milestone.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bids Summary */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">
                {job.bids.length} bid{job.bids.length !== 1 ? 's' : ''} submitted
              </div>
              {job.bids.length > 0 && (
                <div className="text-sm text-turquoise">
                  Avg: ${Math.round(job.bids.reduce((sum, bid) => sum + bid.amount, 0) / job.bids.length)}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedJob(job)}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Details
              </button>
              {userType === 'freelancer' && job.status === 'open' && (
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowBidModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-turquoise text-black font-semibold rounded-lg hover:bg-turquoise/90 transition-colors"
                >
                  Place Bid
                </button>
              )}
            </div>

            {/* Bid List (if expanded) */}
            {selectedJob?.id === job.id && job.bids.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Submitted Bids:</h4>
                <div className="space-y-2">
                  {job.bids.map(bid => (
                    <div key={bid.id} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-white font-medium">{bid.freelancer.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-yellow-500">★ {bid.freelancer.rating}</span>
                            <span className="text-xs text-gray-500">{bid.freelancer.completedJobs} jobs</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-turquoise font-semibold">${bid.amount}</div>
                          <div className="text-xs text-gray-400">{bid.timeline} days</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{bid.proposal}</p>
                      {userType === 'client' && userAddress === job.client.address && (
                        <button
                          onClick={() => acceptBid(job.id, bid.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-500 transition-colors"
                        >
                          Accept & Create Escrow
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bid Modal */}
      {showBidModal && selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Submit Your Bid</h3>
            
            <div className="mb-4">
              <h4 className="text-lg text-turquoise mb-2">{selectedJob.title}</h4>
              <p className="text-gray-400 text-sm">{selectedJob.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Bid Amount ({selectedJob.budget.currency})
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Budget: $${selectedJob.budget.min} - $${selectedJob.budget.max}`}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Timeline (days)
                </label>
                <input
                  type="number"
                  value={bidTimeline}
                  onChange={(e) => setBidTimeline(e.target.value)}
                  placeholder="How many days to complete"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Proposal
                </label>
                <textarea
                  value={bidProposal}
                  onChange={(e) => setBidProposal(e.target.value)}
                  placeholder="Describe your approach and experience..."
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <p className="font-semibold mb-1">Escrow Notice:</p>
                    <p>If your bid is accepted, funds will be locked in a smart contract escrow. Payment will be released based on milestone completion and client approval.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBidModal(false);
                  resetBidForm();
                }}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={submitBid}
                className="flex-1 px-4 py-2 bg-turquoise text-black font-semibold rounded-lg hover:bg-turquoise/90"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidAskMarketplace;