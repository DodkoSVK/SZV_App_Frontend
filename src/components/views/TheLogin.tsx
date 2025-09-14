import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginCredentials } from "@/assets/types/authTypes";
import { Alert } from "@/assets/types/index";
import { loginPerson } from "@/apis/AuthApis";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import FailedAlert from "@/components/alerts/FailedAlert";

const TheLogin: React.FC = () => {
    const [alert, setAlert] = useState<Alert | null>(null); // State to show alert message
    const [loginCredentials, setLoginCredentials] = useState<loginCredentials>({
        login: "",
        password: ""
    });

    const navigate = useNavigate();
    
    const handleLoginButton = async () => {        
        try {
            const loginStatus = await loginPerson(loginCredentials)
            if(loginStatus === 1) {
                setAlert({
                        alertType: true,
                        alertMessage: `OK.`
                    });
            } else if (loginStatus === 2) {
                setAlert({
                        alertType: false,
                        alertMessage: "Nesprávna požiadavka"
                    });
            } else if (loginStatus === 3) {
                setAlert({
                        alertType: false,
                        alertMessage: "Chyba pri spracovaní požiadavky"
                    });
            }
        } catch (e) {
            const error = 4001;
            console.log(`🔴 Chyba: ${error}. ${e}`);
                setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
    
    }
    
    const handleCloseAlert = () => {
        try {
            setAlert(null);
        } catch (e) {
            const error = 2005;
            console.log(`🔴 Chyba: ${error}. ${e}`);
            setAlert({ alertType: false, alertMessage: `Chyba: ${error}`});
        }
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleLoginButton()
                        }}
                    >
                        <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="login">Login</Label>
                            <Input
                                id="login"
                                type="text"
                                placeholder="test.logi"
                                required
                                autoComplete="username"
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
                                autoComplete="current-password"
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
            {alert?.alertType === true && (
                <SuccessAlert  
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
            {alert?.alertType === false && (
                <FailedAlert
                    alertMessage={alert.alertMessage}
                    closeRequest={handleCloseAlert}
                />
            )}
    </div>
    );
}

export default TheLogin;