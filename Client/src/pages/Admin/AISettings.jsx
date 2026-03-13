import { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
const AISettings = () => {
  const [settings, setSettings] = useState({ prompt: '' });

  useEffect(() => {
    api.get('/api/v1/ai/settings').then(res => setSettings(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/api/v1/ai/settings', settings);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">AI Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea placeholder="AI Prompt" value={settings.prompt} onChange={(e) => setSettings({ ...settings, prompt: e.target.value })} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}

export default AISettings;