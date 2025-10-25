'use client'

import React, { useState } from 'react'
import { 
  PenTool, Camera, Code, Video, Music, FileText, 
  Palette, Database, Globe, Mic, BookOpen, TrendingUp,
  ArrowRight, Users, Briefcase, Mail, Search, Calendar,
  MessageCircle, Gamepad2, Shield, HardDrive, Radio,
  Calculator, Share2, GraduationCap, Chrome, Zap, Box,
  Building2, MapPin, Repeat, CreditCard, Monitor
} from 'lucide-react'

interface BApp {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  makerTitle: string
  takerTitle: string
  makerDescription: string
  takerDescription: string
}

interface BAppsMarketplaceProps {
  onSelectApp: (appId: string, role: 'maker' | 'taker') => void
  initialMode?: 'post' | 'earn'
}

const BAppsMarketplace: React.FC<BAppsMarketplaceProps> = ({ onSelectApp, initialMode = 'earn' }) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  const bApps: BApp[] = [
    { id: 'bitcoin-3d', name: '3D', icon: <Box size={16} />, color: '#8B5CF6', makerTitle: 'Need 3D Work', takerTitle: 'Create 3D', makerDescription: 'Post 3D jobs', takerDescription: 'Model for money' },
    { id: 'bitcoin-ai', name: 'AI', icon: <Zap size={16} />, color: '#10B981', makerTitle: 'Need AI Work', takerTitle: 'Build AI', makerDescription: 'Post AI tasks', takerDescription: 'AI for money' },
    { id: 'bitcoin-art', name: 'Art', icon: <Palette size={16} />, color: '#E91E63', makerTitle: 'Need Art', takerTitle: 'Create Art', makerDescription: 'Commission art', takerDescription: 'Art for money' },
    { id: 'bitcoin-books', name: 'Books', icon: <BookOpen size={16} />, color: '#8B4513', makerTitle: 'Need Books', takerTitle: 'Write Books', makerDescription: 'Commission books', takerDescription: 'Write for money' },
    { id: 'bitcoin-browser', name: 'Browser', icon: <Chrome size={16} />, color: '#4285F4', makerTitle: 'Need Browser Work', takerTitle: 'Build Browser', makerDescription: 'Post browser tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-calendar', name: 'Calendar', icon: <Calendar size={16} />, color: '#EA4335', makerTitle: 'Need Calendar Work', takerTitle: 'Build Calendar', makerDescription: 'Post calendar tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-chat', name: 'Chat', icon: <MessageCircle size={16} />, color: '#25D366', makerTitle: 'Need Chat Work', takerTitle: 'Build Chat', makerDescription: 'Post chat tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-cms', name: 'CMS', icon: <FileText size={16} />, color: '#6366F1', makerTitle: 'Need CMS Work', takerTitle: 'Build CMS', makerDescription: 'Post CMS tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-code', name: 'Code', icon: <Code size={16} />, color: '#40E0D0', makerTitle: 'Need Code', takerTitle: 'Write Code', makerDescription: 'Post dev tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-contracts', name: 'Contracts', icon: <FileText size={16} />, color: '#F59E0B', makerTitle: 'Need Contract Work', takerTitle: 'Build Contracts', makerDescription: 'Post contract tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-crm', name: 'CRM', icon: <Building2 size={16} />, color: '#06B6D4', makerTitle: 'Need CRM Work', takerTitle: 'Build CRM', makerDescription: 'Post CRM tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-dns', name: 'DNS', icon: <Globe size={16} />, color: '#8B5CF6', makerTitle: 'Need DNS Work', takerTitle: 'Setup DNS', makerDescription: 'Post DNS tasks', takerDescription: 'DNS for money' },
    { id: 'bitcoin-drive', name: 'Drive', icon: <HardDrive size={16} />, color: '#4285F4', makerTitle: 'Need Storage Work', takerTitle: 'Build Storage', makerDescription: 'Post storage tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-education', name: 'Education', icon: <GraduationCap size={16} />, color: '#10B981', makerTitle: 'Need Education Work', takerTitle: 'Create Education', makerDescription: 'Post education tasks', takerDescription: 'Teach for money' },
    { id: 'bitcoin-email', name: 'Email', icon: <Mail size={16} />, color: '#EA4335', makerTitle: 'Need Email Work', takerTitle: 'Build Email', makerDescription: 'Post email tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-exchange', name: 'Exchange', icon: <Repeat size={16} />, color: '#F59E0B', makerTitle: 'Need Exchange Work', takerTitle: 'Build Exchange', makerDescription: 'Post exchange tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-gaming', name: 'Gaming', icon: <Gamepad2 size={16} />, color: '#8B5CF6', makerTitle: 'Need Game Work', takerTitle: 'Build Games', makerDescription: 'Post game tasks', takerDescription: 'Game dev for money' },
    { id: 'bitcoin-identity', name: 'Identity', icon: <Shield size={16} />, color: '#EF4444', makerTitle: 'Need Identity Work', takerTitle: 'Build Identity', makerDescription: 'Post identity tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-maps', name: 'Maps', icon: <MapPin size={16} />, color: '#10B981', makerTitle: 'Need Maps Work', takerTitle: 'Build Maps', makerDescription: 'Post map tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-marketing', name: 'Marketing', icon: <TrendingUp size={16} />, color: '#16A085', makerTitle: 'Need Marketing', takerTitle: 'Do Marketing', makerDescription: 'Post campaigns', takerDescription: 'Market for money' },
    { id: 'bitcoin-music', name: 'Music', icon: <Music size={16} />, color: '#F39C12', makerTitle: 'Need Music', takerTitle: 'Create Music', makerDescription: 'Commission audio', takerDescription: 'Music for money' },
    { id: 'bitcoin-paint', name: 'Paint', icon: <Palette size={16} />, color: '#E91E63', makerTitle: 'Need Design Work', takerTitle: 'Create Designs', makerDescription: 'Post design tasks', takerDescription: 'Design for money' },
    { id: 'bitcoin-photos', name: 'Photos', icon: <Camera size={16} />, color: '#4ECDC4', makerTitle: 'Need Photos', takerTitle: 'Take Photos', makerDescription: 'Commission photos', takerDescription: 'Photo for money' },
    { id: 'bitcoin-radio', name: 'Radio', icon: <Radio size={16} />, color: '#F59E0B', makerTitle: 'Need Radio Work', takerTitle: 'Create Radio', makerDescription: 'Post radio tasks', takerDescription: 'Radio for money' },
    { id: 'bitcoin-search', name: 'Search', icon: <Search size={16} />, color: '#4285F4', makerTitle: 'Need Search Work', takerTitle: 'Build Search', makerDescription: 'Post search tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-shares', name: 'Shares', icon: <TrendingUp size={16} />, color: '#10B981', makerTitle: 'Need Trading Work', takerTitle: 'Build Trading', makerDescription: 'Post trading tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-social', name: 'Social', icon: <Share2 size={16} />, color: '#1DA1F2', makerTitle: 'Need Social Work', takerTitle: 'Build Social', makerDescription: 'Post social tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-spreadsheets', name: 'Sheets', icon: <Calculator size={16} />, color: '#0F9D58', makerTitle: 'Need Sheet Work', takerTitle: 'Build Sheets', makerDescription: 'Post spreadsheet tasks', takerDescription: 'Code for money' },
    { id: 'bitcoin-video', name: 'Video', icon: <Video size={16} />, color: '#9B59B6', makerTitle: 'Need Video', takerTitle: 'Edit Video', makerDescription: 'Post video jobs', takerDescription: 'Video for money' },
    { id: 'bitcoin-writer', name: 'Writer', icon: <PenTool size={16} />, color: '#FF6B6B', makerTitle: 'Need Content', takerTitle: 'Write Content', makerDescription: 'Post writing jobs', takerDescription: 'Write for money' }
  ]

  return (
    <div className="w-full max-w-none px-2">
      {/* Apps Grid */}
      <div className="grid gap-1.5" style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
        maxWidth: '100vw'
      }}>
        {bApps.map((app) => (
          <button
            key={app.id}
            className="group relative bg-gray-900/30 border border-gray-800 rounded-lg p-2 hover:border-turquoise/50 transition-all"
            onClick={() => onSelectApp(app.id, initialMode === 'post' ? 'maker' : 'taker')}
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            <div className="flex flex-col items-center">
              <div 
                className="p-1.5 rounded-lg mb-1 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${app.color}20`, color: app.color }}
              >
                {app.icon}
              </div>
              <span className="text-xs font-medium text-white leading-tight">
                {app.name}
              </span>
              {hoveredApp === app.id && (
                <span className="text-xs text-gray-400 mt-1">
                  {initialMode === 'post' ? app.makerDescription : app.takerDescription}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BAppsMarketplace