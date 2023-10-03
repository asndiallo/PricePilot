import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import Container from "@/components/container";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
  

const CONTAINER_CLASSES = "w-full max-w-4xl text-center";

const PredictorPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [dateRegistration, setDateRegistration] = useState<Date | undefined>(new Date());

    const [data, setData] = useState({
        name: "",
        year: 2015,
        origin: false,
        registration_date: new Date(),
        technical_inspection: false,
        first_hand: false,
        mileage: 1,
        fuel_type: "",
        transmission: "",
        num_doors: 4,
        num_seats: 4,
        power: "",
        co2_emission: 0.2,
        length: 1,
        critair_rating: 0,
        combined_consumption: "",
    });

    const MAX_STEP = Object.keys(data).length;

    useEffect(() => {
        if (dateRegistration !== null) {
            handleUpdateData("registration_date", dateRegistration);
        }
    }, [dateRegistration])

    const brands = ["Renault", "Peugeot", "BMW"];
    const fuels = ["Essence", "Diesel"];

    const handleUpdateData = (field: string, value: any) => {
        let step = 0;
        const newData = {...data,
            [field]: value,
        };
        for (const [index, [, value]] of Object.entries(Object.entries(newData))) {
            if (value !== null && value !== "") {
                step++;
            }
        }
        console.log(newData);
        setCurrentStep(step);
        setData(newData);
    }

    const isSelectedBrand = (brand: string) => {
        return (brand === data.name.split(' ').shift());
    }

    const handleSubmit = () => {
        console.log("sumbmitted");
    }
    
    return ( 
        <div className="flex flex-col gap-y-8 justify-center items-center w-full p-10">
            {/* Title */}
            <h1 className="text-2xl font-bold drop-shadow-sm">
                Prédiction du prix de votre véhicule
            </h1>
            {/* Progression */}
            <Progress value={currentStep / MAX_STEP * 100} />
            {/* Form */}
            <h1 className="text-2xl font-bold drop-shadow-sm">
                Caractéristiques de votre véhicule
            </h1>
            <Container
                title="Marque du véhicule"
                className={CONTAINER_CLASSES}
            >
                {brands?.map((brand, index) => (
                    <Card
                        onClick={(e) => handleUpdateData("name", brand)}
                        key={index}
                        className={cn(
                            "hover:bg-blue-500/50 hover:dark:bg-blue-500/90 max-w-4xl cursor-pointer transition-all",
                            isSelectedBrand(brand) && "bg-blue-500/50 dark:bg-blue-500/90"
                        )}
                    >
                        <CardHeader>
                            <CardTitle>{brand}</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </Container>
            <Container
                title="Année du véhicule"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="1900" placeholder="2023" value={data.year} onChange={(e)=>handleUpdateData("year", parseInt(e.target.value))} />
            </Container>
            <Container
                title="Date d'enregistrement du véhicule"
                className={CONTAINER_CLASSES}
            >
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={dateRegistration}
                        onSelect={setDateRegistration}
                        initialFocus
                    />
                </div>
            </Container>
            <Container
                title="Kilométrage du véhicule"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" placeholder="7777" value={data.mileage} onChange={(e)=>handleUpdateData("mileage", parseInt(e.target.value))} />
            </Container>
            <Container
                title="Type d'essence"
                className={CONTAINER_CLASSES}
            >
                <Select value={data.fuel_type} onValueChange={(v) => handleUpdateData("fuel_type", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type d'essence" />
                    </SelectTrigger>
                    <SelectContent>
                        {fuels?.map((fuel, index) => (
                            <SelectItem key={index} value={fuel}>{fuel}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Container>

            <Container
                title="Transmission"
                className={CONTAINER_CLASSES}
            >
                <Input placeholder="transmission" value={data.transmission} onChange={(e)=>handleUpdateData("transmission", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Nombre de chevaux"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.power} onChange={(e)=>handleUpdateData("power", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Nombre de portes"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.num_doors} onChange={(e)=>handleUpdateData("num_doors", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Nombre de places"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.num_seats} onChange={(e)=>handleUpdateData("num_seats", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Emission de CO2"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.co2_emission} onChange={(e)=>handleUpdateData("co2_emission", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Longueur"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.length} onChange={(e)=>handleUpdateData("length", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Note crit'air"
                className={CONTAINER_CLASSES}
            >
                <Input type="number" min="0" value={data.critair_rating} onChange={(e)=>handleUpdateData("critair_rating", parseInt(e.target.value))} />
            </Container>

            <Container
                title="Consommation combinée"
                className={CONTAINER_CLASSES}
            >
                <Input placeholder="transmission" value={data.combined_consumption} onChange={(e)=>handleUpdateData("combined_consumption", parseInt(e.target.value))} />
            </Container>

            {/* Autres */}
            <Container
                title="Autres"
                className="flex text-center items-center justify-center"
            >
                <div className="items-top flex flex-col gap-4">
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="origin"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Provient de France ?
                        </label>
                        <p className="text-sm text-muted-foreground">
                        Cocher cette case si le véhicule provient de la France.
                        </p>
                    </div>
                    <input className="cursor-pointer" type="checkbox" id="origin" checked={data.origin} onChange={() => handleUpdateData("origin", !data.origin)}/>
                </div>
                <div className="items-top flex flex-col gap-4">
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="technical_inspection"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Entretien technique
                        </label>
                        <p className="text-sm text-muted-foreground">
                        Cocher cette case si le véhicule a passé son entretien technique.
                        </p>
                    </div>
                    <input className="cursor-pointer" type="checkbox" id="technical_inspection" checked={data.technical_inspection} onChange={() => handleUpdateData("technical_inspection", !data.technical_inspection)}/>
                </div>
                <div className="items-top flex flex-col gap-4">
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="first_hand"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Première main ?
                        </label>
                        <p className="text-sm text-muted-foreground">
                        Cocher cette case si c'est une première main.
                        </p>
                    </div>
                    <input className="cursor-pointer" type="checkbox" id="first_hand" checked={data.first_hand} onChange={() => handleUpdateData("first_hand", !data.first_hand)} />
                </div>
            </Container>

            <Button 
                onClick={handleSubmit}
                variant="default" 
                size="lg" 
            >
                Obtenir le prix du véhicule
            </Button>
        </div>
    );
}
 
export default PredictorPage;