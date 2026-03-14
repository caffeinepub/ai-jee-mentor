import { useCamera } from "@/camera/useCamera";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  Camera,
  FlipHorizontal,
  Loader2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const topicsBySubject: Record<string, string[]> = {
  Physics: [
    "Kinematics",
    "Laws of Motion",
    "Work & Energy",
    "Electrostatics",
    "Magnetism",
    "Optics",
    "Modern Physics",
  ],
  Chemistry: [
    "Atomic Structure",
    "Chemical Bonding",
    "Organic Reactions",
    "Electrochemistry",
    "Equilibrium",
  ],
  Mathematics: [
    "Limits & Continuity",
    "Differentiation",
    "Integration",
    "Matrices",
    "Coordinate Geometry",
    "Trigonometry",
  ],
};

const SKELETON_WIDTHS = [
  { id: "sk1", w: "70%" },
  { id: "sk2", w: "85%" },
  { id: "sk3", w: "78%" },
  { id: "sk4", w: "90%" },
];

type CapturedImage = { id: string; file: File };

function parseAiResponse(response: string): string {
  try {
    const parsed = JSON.parse(response);
    // OpenAI-compatible chat completions format
    if (parsed?.choices?.[0]?.message?.content) {
      return parsed.choices[0].message.content;
    }
    // Legacy HF inference format
    if (Array.isArray(parsed) && parsed[0]?.generated_text) {
      return parsed[0].generated_text;
    }
    // Error response
    if (parsed?.error) {
      return `Error: ${parsed.error}`;
    }
  } catch {
    // not JSON, return as-is
  }
  return response;
}

export default function SolverSection() {
  const { actor } = useActor();
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [solving, setSolving] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [solveError, setSolveError] = useState<string | null>(null);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    isActive,
    isSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    videoRef,
    canvasRef,
  } = useCamera({ facingMode: "environment" });

  const handleSolve = async () => {
    if (!question.trim() && !subject) return;
    setSolving(true);
    setAiResponse(null);
    setSolveError(null);
    try {
      if (!actor) throw new Error("Backend not ready. Please try again.");
      const response = await actor.solveQuestion(question, subject, topic);
      const parsed = parseAiResponse(response);
      if (parsed.startsWith("Error:")) {
        setSolveError(parsed);
      } else {
        setAiResponse(parsed);
      }
    } catch (e: any) {
      setSolveError(
        e?.message || "Failed to get AI response. Please try again.",
      );
    } finally {
      setSolving(false);
    }
  };

  const handleOpenCamera = async () => {
    setCameraOpen(true);
    await startCamera();
  };

  const handleCloseCamera = () => {
    stopCamera();
    setCameraOpen(false);
  };

  const handleCapture = async () => {
    const photo = await capturePhoto();
    if (photo) {
      setCapturedImages((prev) => [
        ...prev,
        { id: `img-${Date.now()}`, file: photo },
      ]);
      handleCloseCamera();
    }
  };

  const handleRemoveImage = (id: string) => {
    setCapturedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section id="solver" className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            AI Question <span className="text-gradient">Solver</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Type or upload your question and get a detailed, step-by-step
            solution instantly.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <Textarea
            data-ocid="solver.textarea"
            placeholder="Type your JEE question here... e.g. A ball is thrown vertically upward with velocity 20 m/s. Find the maximum height."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-32 mb-4 bg-muted/40 border-border/60 resize-none text-sm focus:border-primary/50 placeholder:text-muted-foreground/60"
          />

          {/* Image thumbnails */}
          {capturedImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {capturedImages.map((img, displayIdx) => (
                <div key={img.id} className="relative group">
                  <img
                    src={URL.createObjectURL(img.file)}
                    alt={`Captured ${displayIdx + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-border/60"
                  />
                  <button
                    type="button"
                    data-ocid={`solver.delete_button.${displayIdx + 1}`}
                    onClick={() => handleRemoveImage(img.id)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              type="button"
              data-ocid="solver.upload_button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-muted-foreground hover:text-foreground"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  setCapturedImages((prev) => [
                    ...prev,
                    { id: `img-${Date.now()}`, file },
                  ]);
                e.target.value = "";
              }}
            />

            {isSupported && (
              <button
                type="button"
                data-ocid="solver.open_modal_button"
                onClick={handleOpenCamera}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-muted-foreground hover:text-foreground"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
            )}

            <Select
              value={subject}
              onValueChange={(v) => {
                setSubject(v);
                setTopic("");
              }}
            >
              <SelectTrigger
                data-ocid="solver.select"
                className="bg-muted/40 border-border/60 flex-1"
              >
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {["Physics", "Chemistry", "Mathematics"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={topic} onValueChange={setTopic} disabled={!subject}>
              <SelectTrigger
                data-ocid="solver.topic.select"
                className="bg-muted/40 border-border/60 flex-1"
              >
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent>
                {(subject ? topicsBySubject[subject] : []).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            data-ocid="solver.submit_button"
            onClick={handleSolve}
            disabled={solving || (!question.trim() && !subject)}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-glow"
          >
            {solving ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Solving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 w-4 h-4" />
                Solve Question
              </>
            )}
          </Button>

          {solving && (
            <div data-ocid="solver.loading_state" className="mt-6 space-y-3">
              {SKELETON_WIDTHS.map(({ id, w }) => (
                <div
                  key={id}
                  className="h-4 bg-muted/60 rounded-full animate-pulse"
                  style={{ width: w }}
                />
              ))}
            </div>
          )}

          {solveError && !solving && (
            <div
              data-ocid="solver.error_state"
              className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm"
            >
              {solveError}
            </div>
          )}

          {aiResponse && !solving && (
            <div data-ocid="solver.success_state" className="mt-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  AI Solution
                </span>
              </div>
              <div className="max-h-[500px] overflow-y-auto pr-1">
                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                  {aiResponse}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      <Dialog
        open={cameraOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseCamera();
        }}
      >
        <DialogContent data-ocid="solver.dialog" className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Take a Photo
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {cameraError && (
              <div
                data-ocid="solver.error_state"
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
              >
                {cameraError.message}
              </div>
            )}

            {cameraLoading && (
              <div
                data-ocid="solver.loading_state"
                className="flex items-center justify-center py-8"
              >
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Starting camera...
                </span>
              </div>
            )}

            <div className="relative rounded-xl overflow-hidden bg-black aspect-video w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ width: "100%", height: "100%", minHeight: 240 }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            <div className="flex items-center gap-3">
              {isActive && isMobile && (
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="solver.toggle"
                  onClick={() => switchCamera()}
                  className="flex items-center gap-2"
                >
                  <FlipHorizontal className="w-4 h-4" />
                  Flip
                </Button>
              )}

              {isActive && (
                <Button
                  type="button"
                  data-ocid="solver.primary_button"
                  onClick={handleCapture}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Camera className="mr-2 w-4 h-4" />
                  Capture
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                data-ocid="solver.cancel_button"
                onClick={handleCloseCamera}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
