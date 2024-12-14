import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition, Command } from 'react-speech-recognition';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import axios from 'axios';

interface AIResponse {
    route: string;
}

const VoiceNavigator: React.FC = () => {
    const navigate = useNavigate();
    const [supported, setSupported] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('en-US');
    const [error, setError] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
        resetTranscript();
    };

    const handleReadContent = async () => {
        console.log('handleReadContent called');
        if (!('speechSynthesis' in window)) {
            setError('Text-to-Speech not supported in your browser.');
            return;
        }

        const contentElement = document.querySelector('main') || document.body;
        const originalContent = contentElement?.innerText || '';
        console.log('Original content text:', originalContent);

        if (!originalContent) {
            setError('No content available to read.');
            return;
        }

        setError(null);
        setIsSpeaking(false);
        resetTranscript(); // Clear previous transcript if any

        try {
            // Fetch enhanced content from AI
            const response = await axios.post('http://localhost:5000/api/enhance-content', {
                text: originalContent,
                language,
            });

            let { detailedContent } = response.data;

            if (!detailedContent) {
                setError('AI did not return any enhanced content.');
                return;
            }

            console.log('AI returned detailed content:', detailedContent);

            // Remove asterisks or any other unwanted characters
            // For example, removing all asterisks:
            detailedContent = detailedContent.replace(/\*/g, '');

            const utterance = new SpeechSynthesisUtterance(detailedContent);
            utterance.lang = language;
            utterance.pitch = 1;
            utterance.rate = 1;

            utterance.onend = () => {
                setIsSpeaking(false);
                console.log('Reading ended.');
            };

            utterance.onerror = (e) => {
                console.error('Speech error:', e);
                const speechErrorEvent = e as SpeechSynthesisErrorEvent;
                if (speechErrorEvent.error && speechErrorEvent.error !== 'interrupted') {
                    setError('Error during speech synthesis.');
                }
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            setError(null);
        } catch (err: any) {
            console.error('Error enhancing the content:', err);
            setError('Failed to enhance the content with AI.');
        }
    };


    const handleStopSpeaking = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setError(null);
            resetTranscript();
        }
    };

    const commands: Command[] = [
        {
            command: ['open community tab', 'go to community section', 'navigate to community'],
            callback: () => {
                navigate('/community');
                resetTranscript();
            },
        },
        {
            command: ['open rewards tab', 'go to rewards section', 'navigate to rewards'],
            callback: () => {
                navigate('/rewards');
                resetTranscript();
            },
        },
        {
            command: ['open learning tab', 'go to learning section', 'navigate to learning'],
            callback: () => {
                navigate('/learning');
                resetTranscript();
            },
        },
        {
            command: ['open jobs tab', 'go to jobs section', 'navigate to jobs'],
            callback: () => {
                navigate('/jobs');
                resetTranscript();
            },
        },
        {
            command: ['open support tab', 'go to support section', 'navigate to support'],
            callback: () => {
                navigate('/support');
                resetTranscript();
            },
        },
        {
            command: ['sign in', 'log in', 'login'],
            callback: () => {
                navigate('/login');
                resetTranscript();
            },
        },
        {
            command: ['sign up', 'register', 'create account'],
            callback: () => {
                navigate('/signup');
                resetTranscript();
            },
        },
        {
            command: ['home', 'go home', 'return home'],
            callback: () => {
                navigate('/');
                resetTranscript();
            },
        },
        {
            command: ['sign out', 'log out', 'logout', 'exit account'],
            callback: () => {
                handleSignOut();
            },
        },
        {
            command: [
                'read out the content',
                'read out the content of the page',
                'read the page content',
                'speak the page'
            ],
            callback: () => {
                console.log('TTS command callback triggered');
                handleReadContent();
            },
        },
        {
            command: ['stop', 'halt', 'pause reading'],
            callback: () => {
                console.log('TTS stop command triggered');
                handleStopSpeaking();
            },
        },
    ];

    // List of known TTS commands for extra check in useEffect
    const ttsCommands = [
        'read out the content',
        'read out the content of the page',
        'read the page content',
        'speak the page',
        'stop',
        'halt',
        'pause reading'
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

    useEffect(() => {
        const interpretCommand = async () => {
            if (!listening && transcript) {
                console.log('Transcript after command:', transcript);
                const lower = transcript.toLowerCase();
                if (ttsCommands.some(cmd => lower.includes(cmd))) {
                    resetTranscript();
                    return;
                }

                try {
                    const BACKEND_URL = 'http://localhost:5000';
                    const response = await axios.post<AIResponse>(`${BACKEND_URL}/api/interpret-command`, {
                        transcript,
                        language,
                    });
                    const { route } = response.data;
                    if (route) {
                        navigate(route);
                        resetTranscript();
                    } else {
                        setError('Could not interpret the command.');
                    }
                } catch (err: any) {
                    console.error(err);
                    if (err.response && err.response.data && err.response.data.error) {
                        setError(err.response.data.error);
                    } else {
                        setError('Failed to process the command.');
                    }
                }
            }
        };
        interpretCommand();
    }, [listening, transcript, language, navigate, resetTranscript]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="voice-navigator fixed bottom-4 right-4 flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
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
                </select>
            </div>

            {supported ? (
                <>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            if (listening) {
                                SpeechRecognition.stopListening();
                            } else {
                                setError(null);
                                SpeechRecognition.startListening({ continuous: false, language });
                            }
                        }}
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
                        Try saying "open community tab" or "read out the content of the page"
                    </p>
                    {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
                    {isSpeaking && <p className="mt-2 text-xs text-green-500">Reading out the content...</p>}
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
