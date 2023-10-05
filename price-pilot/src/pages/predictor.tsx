import { useEffect, useState } from "react";

import axios from "axios";

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
import { UseModalStore } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";

export interface CarNameInterface {
    brand: string;
    model: string;
}

const CONTAINER_CLASSES = "w-full max-w-4xl text-center";

const PredictorPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [dateRegistration, setDateRegistration] = useState<Date | undefined>(new Date());
    const { onOpen } = UseModalStore();
    
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
        power: 0,
        co2_emission: 0.2,
        length: 1,
        critair_rating: 0,
        combined_consumption: 0,
    });

    const MAX_STEP = Object.keys(data).length;

    useEffect(() => {
        getCarNames();
    }, [])

    useEffect(() => {
        if (dateRegistration !== null) {
            handleUpdateData("registration_date", dateRegistration);
        }
    }, [dateRegistration])

    const [carNames, setCarNames] = useState([]);
    const fuels = ["Essence", "Diesel"];
    const transmissions = ["Manuelle", "Automatique"];

    const getCarNames = async () => {
        const link = `${import.meta.env.VITE_REACT_APP_API_URL}api/car_names/`;
        axios.get(link)
        .then(res => {
            const data = res.data;

            // Créez un tableau pour stocker les marques uniques
            const uniqueBrands: string[] = [];

            // Filtrer les objets en fonction de la propriété "brand"
            const filteredCarNames = data.filter((carName: CarNameInterface) => {
                if (!uniqueBrands.includes(carName.brand)) {
                    // Si la marque n'est pas encore dans le tableau unique, l'ajouter
                    uniqueBrands.push(carName.brand);
                    return true; // Conservez cet objet car il est unique
                }
                return false; // Ignorez cet objet car la marque est déjà présente
            });

            setCarNames(filteredCarNames);
        })
    }

    const onSubmit = async () => {
        console.log("[DATA]", data);
        const link = `${import.meta.env.VITE_REACT_APP_API_URL}api/predict_price/`;
        axios.post(link, {
            data
        })
        .then(res => {
            console.log("[SUBMIT_RESULT]", res.data);
            onOpen('prediction', { value: res.data.predicted_price });
        })
        .catch(error => {
            toast.error("La connexion à l'API n'a pas pu se faire.");
        })
    }

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
        setCurrentStep(step);
        setData(newData);
    }

    const isSelectedBrand = (brand: string) => {
        return (brand === data.name.split(' ').shift());
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
                <div className="flex justify-center flex-wrap gap-4 overflow-y-scroll max-h-[256px]">
                    {carNames?.map((car: CarNameInterface, index: number) => (
                        <Card
                            onClick={(e) => handleUpdateData("name", car.brand)}
                            key={index}
                            className={cn(
                                "hover:bg-blue-500/50 hover:dark:bg-blue-500/90 w-[256px] cursor-pointer transition-all",
                                isSelectedBrand(car.brand) && "bg-blue-500/50 dark:bg-blue-500/90"
                            )}
                        >
                            <CardHeader>
                                <CardTitle>{car.brand}</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                
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
                title="Type de transmission"
                className={CONTAINER_CLASSES}
            >
                <Select value={data.transmission} onValueChange={(v) => handleUpdateData("transmission", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type de transmission" />
                    </SelectTrigger>
                    <SelectContent>
                        {transmissions?.map((transmission, index) => (
                            <SelectItem key={index} value={transmission}>{transmission}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                <Input type="number" value={data.combined_consumption} onChange={(e)=>handleUpdateData("combined_consumption", parseInt(e.target.value))} />
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
                onClick={onSubmit}
                variant="default" 
                size="lg" 
            >
                Obtenir le prix du véhicule
            </Button>
        </div>
    );
}
 
export default PredictorPage;