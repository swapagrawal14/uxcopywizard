
import React from 'react';
import { Trash2, Clock, Search } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { CopyResult } from '@/types';
import { formatTimestamp, deleteSavedCopy } from '@/utils/copyUtils';
import { Input } from '@/components/ui/input';

interface SavedCopyListProps {
  savedCopies: CopyResult[];
  onSelect: (copy: CopyResult) => void;
  onUpdate: () => void;
}

const SavedCopyList: React.FC<SavedCopyListProps> = ({ savedCopies, onSelect, onUpdate }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { user, isSignedIn } = useUser();

  const filteredCopies = React.useMemo(() => {
    if (!searchQuery.trim()) return savedCopies;
    
    const query = searchQuery.toLowerCase();
    return savedCopies.filter(copy => 
      copy.context.toLowerCase().includes(query) || 
      copy.tone.toLowerCase().includes(query)
    );
  }, [savedCopies, searchQuery]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    // Delete with user ID if signed in
    if (isSignedIn && user) {
      deleteSavedCopy(id, user.id);
    } else {
      deleteSavedCopy(id);
    }
    
    onUpdate();
  };

  if (savedCopies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
        <Clock className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <h3 className="text-lg font-medium">No saved copy yet</h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-xs">
          Generate copy and save it to access it later
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search saved copy..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {filteredCopies.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">No results found</p>
          </div>
        ) : (
          filteredCopies.map((copy) => (
            <div
              key={copy.id}
              onClick={() => onSelect(copy)}
              className="p-3 rounded-md border border-border hover:bg-secondary/40 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                    {copy.tone.charAt(0).toUpperCase() + copy.tone.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(copy.timestamp)}
                  </span>
                </div>
                <button 
                  onClick={(e) => handleDelete(e, copy.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm font-medium mt-1 truncate">{copy.context}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {copy.copy.microcopy[0]}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCopyList;
