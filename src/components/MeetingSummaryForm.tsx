import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MeetingSummaryForm() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const quickPrompts = [
    { id: "executive", label: "Executive Summary", icon: "📊" },
    { id: "action", label: "Action Items", icon: "✅" },
    { id: "technical", label: "Technical Points", icon: "🔧" },
  ];

  const handleQuickPrompt = (promptId: string) => {
    const prompts = {
      executive:
        "Summarize in bullet points for executives, highlight action items clearly",
      action: "Extract all action items with owners and deadlines",
      technical:
        "Focus on technical decisions, architecture, and implementation details",
    };
    setCustomInstructions(prompts[promptId as keyof typeof prompts]);
  };

  const handleClick = () => {
    console.log("clicked", meetingTitle, meetingNotes, customInstructions);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          📝 Create Meeting Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="meeting-title"
            className="text-sm font-medium text-gray-700"
          >
            Meeting Title
          </label>
          <Input
            id="meeting-title"
            placeholder="e.g. Weekly Team Meeting - Q4 Planning"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="meeting-notes"
            className="text-sm font-medium text-gray-700"
          >
            Meeting Notes/Transcript
          </label>
          <Textarea
            id="meeting-notes"
            placeholder="Paste your meeting transcript or notes here..."
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            className="min-h-32 w-full resize-y"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="custom-instructions"
            className="text-sm font-medium text-gray-700"
          >
            Custom Instructions (Optional)
          </label>
          <Textarea
            id="custom-instructions"
            placeholder="e.g. Summarize in bullet points for executives, highlight action items clearly"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            className="min-h-20 w-full resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Quick prompts:
          </label>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <Badge
                key={prompt.id}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200 transition-colors px-4 py-2 text-sm"
                onClick={() => handleQuickPrompt(prompt.id)}
              >
                <span className="mr-1.5">{prompt.icon}</span>
                {prompt.label}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 cursor-pointer"
          size="lg"
          onClick={handleClick}
          disabled={!meetingTitle || !meetingNotes}
        >
          Generate Summary
        </Button>
      </CardContent>
    </Card>
  );
}
