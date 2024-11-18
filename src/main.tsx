import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RouterConf from './root/routers'
import ScreenProvider from './context/screen.context'
import ServiceProvider from './context/service.context'
import {QueryClient, QueryClientProvider} from 'react-query';
import AuthProvider from "@/context/auth.context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ScreenProvider>
                <AuthProvider>
                    <ServiceProvider>
                        <RouterConf/>
                    </ServiceProvider>
                </AuthProvider>
            </ScreenProvider>
        </QueryClientProvider>
    </StrictMode>,
)
