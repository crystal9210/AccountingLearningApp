import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

type Props = {
    isCorrect: boolean;
    explanation: string;
};

export function FeedbackBanner({ isCorrect, explanation }: Props) {
    if (isCorrect) {
        return (
            <Alert
                variant="default"
                className="bg-accent/10 border-accent/20 text-accent-foreground"
            >
                <CheckCircle className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent font-bold">
                    正解！
                </AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert">
                    {explanation}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Alert variant="destructive" className="bg-destructive/10">
            <XCircle className="h-4 w-4" />
            <AlertTitle className="font-bold">不正解</AlertTitle>
            <AlertDescription className="prose prose-sm dark:prose-invert">
                <strong>【解説】</strong>
                <p>{explanation}</p>
            </AlertDescription>
        </Alert>
    );
}
