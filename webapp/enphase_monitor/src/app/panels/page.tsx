import Panels from "../components/panels";

export default async function PanelsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { serialNumber } = (await searchParams);
    return (
        <>
            <h1>Panels</h1>
            <Panels serialNumber={serialNumber as string | undefined} />
        </>
    );
}