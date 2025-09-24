import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  postedDate: string;
  tags: string[];
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Bitcoin Core Developer',
        company: 'Bitcoin Company',
        location: 'Remote',
        type: 'Full-time',
        salary: '$120k - $180k',
        description: 'Looking for experienced Bitcoin protocol developers',
        postedDate: '2025-01-20',
        tags: ['Bitcoin', 'C++', 'Protocol']
      },
      {
        id: '2',
        title: 'Lightning Network Engineer',
        company: 'Lightning Labs',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$140k - $200k',
        description: 'Build the future of Bitcoin payments',
        postedDate: '2025-01-19',
        tags: ['Lightning', 'Go', 'Distributed Systems']
      },
      {
        id: '3',
        title: 'Smart Contract Developer',
        company: 'BSV Solutions',
        location: 'Remote',
        type: 'Contract',
        salary: '$80/hour',
        description: 'Develop sCrypt smart contracts on Bitcoin SV',
        postedDate: '2025-01-18',
        tags: ['BSV', 'sCrypt', 'TypeScript']
      }
    ];
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bitcoin Jobs</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                  <p className="text-gray-700 mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.type}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {job.salary}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{job.description}</p>
                  
                  <div className="flex gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 ml-4">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;