import { cn } from "@/lib/utils";

interface ContainerProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const Container = ({
    title,
    className,
    children,
}: ContainerProps) => {
    return ( 
        <div className={cn(
            "flex flex-col gap-6",
            className
        )}>
            <h2 className="text-md text-slate-700 font-semibold drop-shadow-sm">{title}</h2>
            {children}
        </div>
    );
}
 
export default Container;