import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { Button, Input, Select, Badge } from '../ui/Core';
import { Member, Relation } from '../../lib/types';
const relationOptions: {
  label: string;
  value: Relation;
}[] = [
{
  label: 'Head',
  value: 'Head'
},
{
  label: 'Spouse',
  value: 'Spouse'
},
{
  label: 'Son',
  value: 'Son'
},
{
  label: 'Daughter',
  value: 'Daughter'
},
{
  label: 'Father',
  value: 'Father'
},
{
  label: 'Mother',
  value: 'Mother'
},
{
  label: 'Brother',
  value: 'Brother'
},
{
  label: 'Sister',
  value: 'Sister'
},
{
  label: 'Other',
  value: 'Other'
}];

const emptyMember: Partial<Member> = {
  relation: 'Son',
  gender: 'Male'
};
export function MembersList({
  members,
  onAdd,
  onUpdate,
  onRemove,
  readOnly = false






}: {members: Member[];onAdd?: (m: Member) => void;onUpdate?: (id: string, updates: Partial<Member>) => void;onRemove?: (id: string) => void;readOnly?: boolean;}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Partial<Member>>(emptyMember);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Member>>({});
  const handleAdd = () => {
    if (!draft.name || !draft.age) return;
    const member: Member = {
      id: `m_${Date.now()}`,
      name: draft.name ?? '',
      relation: (draft.relation as Relation) || 'Other',
      age: Number(draft.age),
      gender: (draft.gender as 'Male' | 'Female') || 'Male',
      phone: draft.phone,
    };
    onAdd?.(member);
    setDraft(emptyMember);
    setAdding(false);
  };
  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setEditDraft(m);
  };
  const saveEdit = () => {
    if (editingId) onUpdate?.(editingId, editDraft);
    setEditingId(null);
    setEditDraft({});
  };
  const getRelationColor = (relation: Relation) => {
    if (relation === 'Head') return 'success';
    if (['Spouse', 'Father', 'Mother'].includes(relation)) return 'warning';
    return 'default';
  };
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <th className="px-2 py-2 font-medium">Name</th>
              <th className="px-2 py-2 font-medium">Relation</th>
              <th className="px-2 py-2 font-medium">Age</th>
              <th className="px-2 py-2 font-medium">Gender</th>
              <th className="px-2 py-2 font-medium">Phone</th>
              {!readOnly && <th className="px-2 py-2 font-medium w-20"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {members.map((m) =>
            editingId === m.id ?
            <tr key={m.id} className="bg-slate-50 dark:bg-slate-800/30">
                  <td className="px-2 py-2">
                    <Input
                  value={editDraft.name || ''}
                  onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    name: e.target.value
                  })
                  }
                  className="h-8 text-sm" />
                
                  </td>
                  <td className="px-2 py-2">
                    <Select
                  options={relationOptions}
                  value={editDraft.relation || 'Other'}
                  onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    relation: e.target.value as Relation
                  })
                  }
                  className="h-8 text-sm" />
                
                  </td>
                  <td className="px-2 py-2">
                    <Input
                  type="number"
                  value={editDraft.age || ''}
                  onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    age: Number(e.target.value)
                  })
                  }
                  className="h-8 text-sm w-16" />
                
                  </td>
                  <td className="px-2 py-2">
                    <Select
                  options={[
                  {
                    label: 'Male',
                    value: 'Male'
                  },
                  {
                    label: 'Female',
                    value: 'Female'
                  }]
                  }
                  value={editDraft.gender || 'Male'}
                  onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    gender: e.target.value as 'Male' | 'Female'
                  })
                  }
                  className="h-8 text-sm" />
                
                  </td>
                  <td className="px-2 py-2">
                    <Input
                  value={editDraft.phone || ''}
                  onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    phone: e.target.value
                  })
                  }
                  className="h-8 text-sm" />
                
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-1">
                      <button
                    onClick={saveEdit}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded"
                    type="button">
                    
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                    type="button">
                    
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr> :

            <tr
              key={m.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
              
                  <td className="px-2 py-2.5 font-medium text-slate-900 dark:text-white">
                    {m.name}
                  </td>
                  <td className="px-2 py-2.5">
                    <Badge variant={getRelationColor(m.relation)}>
                      {m.relation}
                    </Badge>
                  </td>
                  <td className="px-2 py-2.5 text-slate-600 dark:text-slate-300">
                    {m.age}
                  </td>
                  <td className="px-2 py-2.5 text-slate-600 dark:text-slate-300">
                    {m.gender}
                  </td>
                  <td className="px-2 py-2.5 text-slate-600 dark:text-slate-300">
                    {m.phone || <span className="text-slate-400">—</span>}
                  </td>
                  {!readOnly &&
              <td className="px-2 py-2.5">
                      <div className="flex gap-1">
                        <button
                    onClick={() => startEdit(m)}
                    className="p-1 text-slate-400 hover:text-masjid-600 rounded"
                    type="button">
                    
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                    onClick={() => onRemove?.(m.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                    type="button">
                    
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
              }
                </tr>

            )}
            {members.length === 0 &&
            <tr>
                <td
                colSpan={readOnly ? 5 : 6}
                className="px-2 py-6 text-center text-sm text-slate-500">
                
                  No members added yet.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {!readOnly &&
      <>
          {adding ?
        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-md p-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
              placeholder="Full name"
              value={draft.name || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                name: e.target.value
              })
              } />
            
                <Select
              options={relationOptions}
              value={draft.relation || 'Son'}
              onChange={(e) =>
              setDraft({
                ...draft,
                relation: e.target.value as Relation
              })
              } />
            
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input
              type="number"
              placeholder="Age"
              value={draft.age || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                age: Number(e.target.value)
              })
              } />
            
                <Select
              options={[
              {
                label: 'Male',
                value: 'Male'
              },
              {
                label: 'Female',
                value: 'Female'
              }]
              }
              value={draft.gender || 'Male'}
              onChange={(e) =>
              setDraft({
                ...draft,
                gender: e.target.value as 'Male' | 'Female'
              })
              } />
            
                <Input
              placeholder="Phone (optional)"
              value={draft.phone || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                phone: e.target.value
              })
              } />
            
              </div>
              <div className="flex justify-end gap-2">
                <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setAdding(false);
                setDraft(emptyMember);
              }}>
              
                  Cancel
                </Button>
                <Button type="button" size="sm" onClick={handleAdd}>
                  Add Member
                </Button>
              </div>
            </div> :

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAdding(true)}>
          
              <Plus className="h-4 w-4 mr-2" /> Add Member
            </Button>
        }
        </>
      }
    </div>);

}