import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import api from '../../utils/api.js';

export default function WebsiteEditor() {
  const [content, setContent] = useState({ heroTitle: '', heroDescription: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/website', content); // Assume endpoint
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Website Editor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Hero Title" value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} />
        <Textarea placeholder="Hero Description" value={content.heroDescription} onChange={(e) => setContent({ ...content, heroDescription: e.target.value })} />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}