import React, { useState } from 'react';
import { Plus, Paperclip, Calendar, Trash2, Upload } from 'lucide-react';
import { useAppStore } from '../stores';
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Select } from
'../components/ui/Core';
import { Modal } from '../components/ui/Modal';
import { Announcement } from '../lib/types';
export function Announcements() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Announcement>>({
    category: 'General',
    hasAttachment: false
  });
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Jummah':
        return 'success';
      case 'Event':
        return 'warning';
      case 'Notice':
        return 'danger';
      default:
        return 'default';
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: `a_${Date.now()}`,
      title: draft.title || '',
      content: draft.content || '',
      category: draft.category as Announcement['category'] || 'General',
      date: new Date().toISOString().split('T')[0],
      hasAttachment: !!draft.hasAttachment
    };
    addAnnouncement(newAnnouncement);
    setIsOpen(false);
    setDraft({
      category: 'General',
      hasAttachment: false
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Announcements
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Broadcast messages and notices to the community.
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) =>
        <Card key={announcement.id} className="flex flex-col group">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={getCategoryColor(announcement.category)}>
                  {announcement.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {announcement.date}
                  </div>
                  <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600"
                  title="Delete">
                  
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {announcement.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">
                {announcement.content}
              </p>

              {announcement.hasAttachment &&
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm text-masjid-600 dark:text-masjid-400">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attachment included
                </div>
            }
            </CardContent>
          </Card>
        )}
        {announcements.length === 0 &&
        <p className="text-sm text-slate-500 col-span-full text-center py-12">
            No announcements yet. Click "New Post" to get started.
          </p>
        }
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Announcement">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            required
            placeholder="e.g. Eid Prayer Timings"
            value={draft.title || ''}
            onChange={(e) =>
            setDraft({
              ...draft,
              title: e.target.value
            })
            } />
          
          <Select
            label="Category"
            options={[
            {
              label: 'General',
              value: 'General'
            },
            {
              label: 'Jummah',
              value: 'Jummah'
            },
            {
              label: 'Event',
              value: 'Event'
            },
            {
              label: 'Notice',
              value: 'Notice'
            }]
            }
            value={draft.category || 'General'}
            onChange={(e) =>
            setDraft({
              ...draft,
              category: e.target.value as any
            })
            } />
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              required
              rows={5}
              placeholder="Write the announcement details..."
              value={draft.content || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                content: e.target.value
              })
              }
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-masjid-500 focus:border-transparent dark:text-slate-50" />
            
          </div>

          {/* File upload mock */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Attachment (optional)
            </label>
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <Upload className="h-6 w-6 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500">
                Click or drag a PDF/image to upload
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                setDraft({
                  ...draft,
                  hasAttachment: !!e.target.files?.length
                })
                } />
              
              {draft.hasAttachment &&
              <span className="text-xs text-masjid-600 mt-2">
                  File attached
                </span>
              }
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}>
              
              Cancel
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </form>
      </Modal>
    </div>);

}