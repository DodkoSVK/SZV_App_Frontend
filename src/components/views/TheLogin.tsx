import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const TheLogin: React.FC = () => {

    // form
    


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
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
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
                            <Input id="password" type="password" required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                                Prihlásiť
                            </Button>
                        </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                            Sign up
                        </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
    </div>
    );
}

export default TheLogin;