import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Edit3, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Input } from "./ui/input";
import { baseUrl } from "@/utils/constant";
import axios from "axios";

interface GeneratedSummaryProps {
  summary: string;
  meetingTitle: string;
  onSave?: (updatedSummary: string) => void;
  onClose?: () => void;
}

export function GeneratedSummary({
  summary,
  onSave,
  onClose,
  meetingTitle,
}: GeneratedSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary ?? "");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState(meetingTitle);
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
  };

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/v1/sendmail`, {
        recipients,
        subject,
        editedSummary,
        additionalMessage,
      });
      console.log(response);
      if (response.status === 200) {
        onClose?.();
        setRecipients("");
        setAdditionalMessage("");
        setSubject("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
                <ReactMarkdown>{editedSummary}</ReactMarkdown>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {!isEditing && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Send Summary via Email
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="recipients"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipients
              </label>
              <Input
                id="recipients"
                type="text"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="email1@company.com, email2@company.com"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple email addresses with commas
              </p>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="additional-message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Message (Optional)
              </label>
              <Textarea
                id="additional-message"
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                placeholder="Any additional context or message to include..."
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button
              onClick={handleSendEmail}
              loading={loading}
              disabled={!recipients || !subject}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
