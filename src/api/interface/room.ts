export interface FacilityInfo {
    title: string;
    isProvide: boolean;
}

export interface Room {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageUrlList: string[];
    areaInfo: string;
    bedInfo: string;
    maxPeople: number;
    price: number;
    status: number;
    facilityInfo: FacilityInfo[];
    amenityInfo: FacilityInfo[];
    createdAt: string;
    updatedAt: string;
}