// src/components/VoiceNavigator.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import Button from './ui/Button';

// Define the Command interface locally
interface Command {
    command: string | string[];
    callback: (...args: any[]) => void;
    matchInterim?: boolean;
    bestMatchOnly?: boolean;
}

const VoiceNavigator: React.FC = () => {
    const navigate = useNavigate();
    const [supported, setSupported] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('en-US');

    // Define the commands and their corresponding actions
    const commands: Command[] = [
        {
            command: ['open community tab', 'go to community section', 'navigate to community'],
            callback: () => navigate('/community'),
        },
        {
            command: ['open rewards tab', 'go to rewards section', 'navigate to rewards', 'open reward tab'],
            callback: () => navigate('/rewards'),
        },
        {
            command: ['open learning tab', 'go to learning section', 'navigate to learning'],
            callback: () => navigate('/learning'),
        },
        {
            command: ['open jobs tab', 'go to jobs section', 'navigate to jobs', 'open job tab',],
            callback: () => navigate('/jobs'),
        },
        {
            command: ['open support tab', 'go to support section', 'navigate to support'],
            callback: () => navigate('/support'),
        },
        {
            command: ['sign in', 'log in', 'login'],
            callback: () => navigate('/login'),
        },
        {
            command: ['sign up', 'register', 'create account'],
            callback: () => navigate('/signup'),
        },
        {
            command: ['home', 'go home', 'return home'],
            callback: () => navigate('/'),
        },
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        setSupported(browserSupportsSpeechRecognition);
    }, [browserSupportsSpeechRecognition]);

    const handleToggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: false, language });
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="voice-navigator fixed bottom-4 right-4 flex flex-col items-center">
            {/* Language Selector */}
            <div className="mb-2">
                <label htmlFor="language" className="block text-xs font-medium text-gray-700">
                    Language
                </label>
                <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                    {/* Add more languages as needed */}
                </select>
            </div>

            {supported ? (
                <>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleToggleListening}
                        aria-label={listening ? 'Stop voice commands' : 'Start voice commands'}
                        title={listening ? 'Stop voice commands' : 'Start voice commands'}
                        className={`transition-colors duration-300 ${listening ? 'bg-red-100 border-red-500' : ''}`}
                    >
                        {listening ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <p className="mt-2 text-xs text-gray-600">
                        {listening ? 'Listening...' : 'Voice Commands'}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Try saying "open community tab" or "sign in"
                    </p>
                </>
            ) : (
                <div className="flex items-center text-red-500">
                    <AlertCircle className="h-5 w-5 mr-1" />
                    <span className="text-xs">Voice commands not supported.</span>
                </div>
            )}
        </div>
    );
};

export default VoiceNavigator;
