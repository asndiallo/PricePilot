import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { UseModalStore } from "@/hooks/use-modal-store";


const ModalPrediction = () => {
    const { isOpen, onClose, type, data } = UseModalStore();

    // On vérifie si le modal est ouvert
    if (!isOpen || type !== "prediction") {
        return null;
    }

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number)
    }

    return ( 
        <Dialog onOpenChange={onClose} open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Résultat de la prédiction</DialogTitle>
                    <DialogDescription>
                        Voici le prix de votre véhicule après l'application de notre algorithme de prédiction
                    </DialogDescription>
                    <div className="flex items-center justify-center pt-5">
                        <span className="text-4xl font-bold">
                            {data.value !== undefined &&
                                formatNumber(parseInt(data.value))
                            }
                        </span>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
 
export default ModalPrediction;