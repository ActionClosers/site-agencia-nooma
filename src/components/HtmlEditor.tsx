import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Code, Quote } from 'lucide-react';

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const HtmlEditor = ({ value, onChange, placeholder }: HtmlEditorProps) => {
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useState<HTMLTextAreaElement | null>(null);

  const insertTag = (openTag: string, closeTag: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText;
    if (selectedText) {
      // Se há texto selecionado, envolve com as tags
      newText = value.substring(0, start) + openTag + selectedText + closeTag + value.substring(end);
    } else {
      // Se não há seleção, insere as tags vazias
      newText = value.substring(0, start) + openTag + closeTag + value.substring(end);
    }
    
    onChange(newText);
    
    // Reposiciona o cursor
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + openTag.length + selectedText.length + closeTag.length, start + openTag.length + selectedText.length + closeTag.length);
      } else {
        textarea.setSelectionRange(start + openTag.length, start + openTag.length);
      }
    }, 0);
  };

  const insertList = (ordered: boolean = false) => {
    const tag = ordered ? 'ol' : 'ul';
    const listItem = '\n  <li>Item da lista</li>\n  <li>Outro item</li>\n';
    insertTag(`<${tag}>${listItem}`, `</${tag}>`);
  };

  const insertHeading = (level: number) => {
    insertTag(`<h${level}>`, `</h${level}>`);
  };

  // Converte HTML básico para preview
  const renderPreview = () => {
    return { __html: value };
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHeading(1)}
              title="Título 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHeading(2)}
              title="Título 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHeading(3)}
              title="Título 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertTag('<strong>', '</strong>')}
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertTag('<em>', '</em>')}
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertList(false)}
              title="Lista com marcadores"
            >
              <List className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertList(true)}
              title="Lista numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertTag('<blockquote>', '</blockquote>')}
              title="Citação"
            >
              <Quote className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertTag('<code>', '</code>')}
              title="Código inline"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Editor */}
          <Textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Digite o conteúdo do post aqui..."}
            rows={15}
            className="font-mono text-sm"
          />
          
          <div className="text-xs text-muted-foreground">
            <p>💡 <strong>Dicas:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Selecione texto e clique nos botões para aplicar formatação</li>
              <li>Use HTML básico: &lt;p&gt;, &lt;br&gt;, &lt;a href=""&gt;, &lt;img src=""&gt;</li>
              <li>Para quebra de linha simples use &lt;br&gt;</li>
              <li>Para parágrafos use &lt;p&gt;conteúdo&lt;/p&gt;</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="border rounded-lg p-4 min-h-[400px] bg-background">
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={renderPreview()}
            />
            {!value && (
              <p className="text-muted-foreground italic">
                O preview aparecerá aqui quando você digitar no editor...
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};