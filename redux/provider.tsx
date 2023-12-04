import { Provider } from "react-redux";
import storeQLC, { persistor } from "./storeQLC";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={storeQLC}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
