import {WelcomePage} from "../WelcomePage";
import {Visualization} from "../Visualization";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Visualizations, API} from "../Visualizations";

const routes = [
    {
        label: "Welcome",
        path: "/welcome",
        component: WelcomePage
    },
    {
        label: "Visualization",
        path: "/visualization",
        component: Visualizations
    },
    {
        label: "Visualization",
            path: "/visualization/:id",
        component: Visualization
    }
]


export function Routing() {

    return (
        <HashRouter>
            <Routes>
                <Route path={""} element={<Navigate to={"/welcome"} replace/>}/>
                {
                    routes.map(route => (
                        <Route key={route.label} path={route.path} Component={route.component} id={route.path}/>))
                }
            </Routes>
        </HashRouter>
    )
}
