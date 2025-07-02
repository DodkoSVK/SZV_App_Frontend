import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginCredentials } from "@/assets/types/authTypes";
import { loginPerson } from "@/apis/AuthApis";

const TheLogin: React.FC = () => {
    const [loginCredentials, setLoginCredentials] = useState<loginCredentials>({
        login: "",
        password: ""
    });

    const navigate = useNavigate();
    
    const handleLoginButton = async () => {

    }
    
    

    // Add event listener to esc keyboard
    useEffect(() => {
        //fetchPersons();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                navigate(-1);
                //handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-xs">
            <Card className="w-full max-w-md">
                <CardHeader className="text-2xl">
                    <CardTitle>Prihlásenie</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="login">Login</Label>
                            <Input
                                id="login"
                                type="text"
                                placeholder="test.logi"
                                required
                                onChange={(e) => setLoginCredentials({
                                    ...loginCredentials,
                                    login: e.target.value
                                })}
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                            <Label htmlFor="password">Heslo</Label>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Zabudnuté heslo ?
                            </a>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                onChange={(e) => setLoginCredentials({
                                    ...loginCredentials,
                                    password: e.target.value
                                })}    
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button 
                                type="submit"
                                className="w-full"
                                variant="green"
                                onClick={() => handleLoginButton()}
                            >
                                Prihlásiť
                            </Button>
                        </div>
                        </div>
                        {/* <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div> */}
                    </form>
                </CardContent>
            </Card>
    </div>
    );
}

export default TheLogin;