import { useState } from 'react';
import { Copy, Check, Terminal, BookOpen, FileCode } from 'lucide-react';
import { useBasketStore } from '@/store/basketStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

export function OutputPanel() {
  const { tools } = useBasketStore();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast({
      title: 'Copied to clipboard',
      description: 'Commands have been copied successfully.',
    });
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate install commands
  const npmInstalls = tools
    .filter((t) => t.installCommand.startsWith('npm install'))
    .map((t) => t.installCommand.replace('npm install ', '').replace('-D ', ''))
    .join(' ');

  const devInstalls = tools
    .filter((t) => t.installCommand.includes('-D'))
    .map((t) => t.installCommand.replace('npm install -D ', ''))
    .join(' ');

  const initCommands = tools
    .filter((t) => t.installCommand.startsWith('npx') || t.installCommand.startsWith('npm create'))
    .map((t) => t.installCommand);

  const setupSteps = tools
    .filter((t) => t.setupSteps && t.setupSteps.length > 0)
    .flatMap((t) => [
      `# ${t.name}`,
      ...(t.setupSteps || []),
      '',
    ]);

  const docsLinks = tools.map((t) => `${t.name}: ${t.docsUrl}`);

  if (tools.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center border-t border-border">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Terminal className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground mb-1">No commands yet</h3>
        <p className="text-sm text-muted-foreground">
          Add tools to see install commands
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border-t border-border">
      <Tabs defaultValue="commands" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-3 h-10 bg-muted">
            <TabsTrigger value="commands" className="text-xs">
              <Terminal className="h-3.5 w-3.5 mr-1.5" />
              Commands
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-xs">
              <FileCode className="h-3.5 w-3.5 mr-1.5" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="docs" className="text-xs">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              Docs
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="commands" className="p-4 mt-0 space-y-4">
            {initCommands.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Initialize
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(initCommands.join('\n'), 'init')}
                  >
                    {copiedSection === 'init' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                  {initCommands.map((cmd, i) => (
                    <div key={i} className="text-foreground">{cmd}</div>
                  ))}
                </div>
              </div>
            )}

            {npmInstalls && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dependencies
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(`npm install ${npmInstalls}`, 'deps')}
                  >
                    {copiedSection === 'deps' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                  <span className="text-muted-foreground">npm install </span>
                  <span className="text-foreground">{npmInstalls}</span>
                </div>
              </div>
            )}

            {devInstalls && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dev Dependencies
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(`npm install -D ${devInstalls}`, 'devDeps')}
                  >
                    {copiedSection === 'devDeps' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                  <span className="text-muted-foreground">npm install -D </span>
                  <span className="text-foreground">{devInstalls}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="setup" className="p-4 mt-0">
            {setupSteps.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Setup Steps
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(setupSteps.join('\n'), 'setup')}
                  >
                    {copiedSection === 'setup' ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm space-y-1">
                  {setupSteps.map((step, i) => (
                    <div
                      key={i}
                      className={step.startsWith('#') ? 'text-primary font-medium mt-2' : 'text-foreground'}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No additional setup steps required
              </div>
            )}
          </TabsContent>

          <TabsContent value="docs" className="p-4 mt-0">
            <div className="space-y-2">
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors group"
                >
                  <span className="font-medium text-foreground">{tool.name}</span>
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    View Docs →
                  </span>
                </a>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
