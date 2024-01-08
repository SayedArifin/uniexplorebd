"use client"
import { CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
    moreInfo?: string;
    disabled?: boolean;
    onchange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MarkdownEditor = ({ moreInfo, disabled = false, onchange }: MarkdownEditorProps) => {
    const [markdown, setMarkdown] = useState(
        moreInfo ||
        `### we don't have any additional information to share at the moment. However, don't worry! You can always visit the official website for a wealth of information about that university, programs, and much more`
    );

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(e.target.value);
        if (onchange) {
            onchange(e);
        }
    };

    return (
        <div>
            <Textarea
                value={markdown}
                name='moreInfo'
                placeholder='Type your Markdown here...'
                onChange={handleInputChange}
                disabled={disabled}
            />
            <CardTitle className="font-bold">
                Preview:
            </CardTitle>
            <div className='prose bg-white rounded-md p-5 mt-5 min-w-full'>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownEditor;
