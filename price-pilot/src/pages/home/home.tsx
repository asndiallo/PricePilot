import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { NavLink } from "react-router-dom";
  

const HomePage = () => {
    return ( 
        <div className="flex flex-col w-full h-full items-center
        gap-y-10 pt-20">
            <p className="text-center mb-10">
                 <h1
                    className="text-5xl font-bold"
                >
                    Bienveune sur Price Pilot !
                </h1>
                <h2
                    className="font-semibold text-blue-500 mt-4"
                >
                    L'outil n°1 de prédicteur de prix pour les véhicules
                </h2>
            </p>
            <div className="flex gap-x-4">
                <Card className="w-fit border border-black dark:border-white">
                    <CardHeader>
                        <CardTitle>Prédicteur de prix</CardTitle>
                        <CardDescription>Utiliser l'outil de prédicteur de prix</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NavLink to="/predictor">
                            <Button variant="default" size="lg" className="font-bold">
                                Calculer
                            </Button>
                        </NavLink>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
 
export default HomePage;