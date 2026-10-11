import { Outlet } from "react-router"
import backgroundImage from "../assets/background-image.png"
import Logo from "../components/common/Logo"
import FeatureHighlights from "../components/common/FeatureHighlights"
import { ChartNoAxesColumn, SquareCheckBig, UserGroup, Zap } from "lucide-react"

const AuthLayout = () => {
    const features = [
        {
            id: 1,
            title: "Manage Tasks",
            description: "Keep your work organized",
            icon: SquareCheckBig,
            backgroundColor: "bg-blue-500"
        },
        {
            id: 2,
            title: "Collaborate",
            description: "Work together with your team",
            icon: UserGroup,
            backgroundColor: "bg-purple-500"
        },
        {
            id: 3,
            title: "Track Progress",
            description: "See what's getting done",
            icon: ChartNoAxesColumn,
            backgroundColor: "bg-green-300"
        },
        {
            id: 4,
            title: "Achieve Goals",
            description: "Turn plans into results",
            icon: Zap,
            backgroundColor: "bg-amber-300"
        }
    ]


    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Left side */}
            <div className="hidden lg:block w-1/2 min-h-screen bg-cover bg-center bg-no-repeat p-10"
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="w-[55%]">
                    <Logo />

                    <div className="flex flex-col gap-2 text-4xl font-bold pt-10">
                        <span className="text-white">Plan Smarter.</span>
                        <span className="text-white">Work Better.</span>
                        <span className="bg-linear-to-r from-blue-600 to-pink-300 bg-clip-text text-transparent">Achieve More.</span>
                    </div>

                    <p className="text-sm text-slate-400 font-semibold pt-4 leading-tight">
                        Organize your tasks, manage projects, and stay productive - all in one place.
                    </p>

                    <div className="pt-2">
                        {features.map((feature) => (
                            <FeatureHighlights
                                key={feature.id}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                                backgroundColor={feature.backgroundColor}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center pt-2">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout