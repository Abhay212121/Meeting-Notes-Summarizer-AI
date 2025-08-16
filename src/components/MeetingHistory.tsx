import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { baseUrl } from "@/utils/constant";

import ReactMarkdown from "react-markdown";

interface Meeting {
  meeting_id: string;
  meeting_title: string;
  created_at: string;
  meeting_summary: string;
}

export function MeetingHistory() {
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/gethistory`);
      if (response.status === 200) {
        setMeetings(response.data.historyData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleDelete = async (meetingId: string) => {
    try {
      setDeletingId(meetingId);
      const response = await axios.post(`${baseUrl}/api/v1/deletesummary`, {
        meetingId,
      });
      if (response.status === 200) {
        setMeetings((prev) =>
          prev.filter((meeting) => meeting.meeting_id !== meetingId)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = () => {
    getHistory();
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="w-full shadow-md rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-900">
            <span>📚 Meeting History</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-1 text-sm bg-white border-gray-300 hover:bg-gray-100"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </CardHeader>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
        </div>
      )}

      {!loading && (
        <CardContent className="space-y-4">
          {meetings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No meetings found. Create your first meeting summary above!</p>
            </div>
          ) : (
            meetings.map((meeting) => {
              const isExpanded = expandedId === meeting.meeting_id;
              return (
                <div
                  key={meeting.meeting_id}
                  className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {meeting.meeting_title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {new Date(meeting.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpand(meeting.meeting_id)}
                        className="flex items-center gap-1 text-xs px-2 py-1 h-auto shrink-0"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            Expand
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(meeting.meeting_id)}
                        disabled={deletingId === meeting.meeting_id}
                        className="flex items-center gap-1 text-xs px-2 py-1 h-auto shrink-0 bg-red-500 hover:bg-red-600"
                      >
                        {deletingId === meeting.meeting_id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        <span className="hidden sm:inline">
                          {deletingId === meeting.meeting_id
                            ? "Deleting..."
                            : "Delete"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`text-xs md:text-sm text-gray-700 break-words transition-all duration-300 ${
                      isExpanded ? "line-clamp-none mt-2" : "line-clamp-2"
                    }`}
                  >
                    <ReactMarkdown>{meeting.meeting_summary}</ReactMarkdown>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      )}
    </Card>
  );
}
