import { vehicles } from "@/lib/data";
import CarDetailClient from "./CarDetailClient";

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CarDetailClient id={id} />;
}
