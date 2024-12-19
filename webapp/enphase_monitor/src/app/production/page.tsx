import Production from "../components/production";
import { useGlobalState } from "../components/GlobalStateContext";

export default function ProductionPage() {
    const { globalState } = useGlobalState();
    return <div>
        <Production autoRefresh={globalState.autoRefresh} visible
            ratePerKWHUnder1000={globalState.ratePerKWHUnder1000} ratePerKWHOver1000={globalState.ratePerKWHOver1000} />
    </div>;
}
