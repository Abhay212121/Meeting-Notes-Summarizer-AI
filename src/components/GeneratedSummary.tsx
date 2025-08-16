import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Edit3 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface GeneratedSummaryProps {
  summary: string;
  onSave?: (updatedSummary: string) => void;
  onCancel?: () => void;
}

export function GeneratedSummary({
  summary,
  onSave,
  onCancel,
}: GeneratedSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSummary(summary);
  };

  const handleSave = () => {
    onSave?.(editedSummary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Generated Summary
          </h2>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="flex items-center gap-1.5 bg-transparent"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              placeholder="Edit your meeting summary..."
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
