export interface ICategory {
  id: number;
  title: string;
}

export interface IUser {
  id: number;
  name: string;
  avatar: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  brand: IBrands;
  mainPhoto: IFile[];
  photos: IFile[];
  unitType: IUnitType;
  hits: number;
  amount: number;
  price: number;
  category: ICategories;
  subCategory: ISubcategory;
  provider: IProvider;
  // status: "published" | "draft" | "rejected";
  // category: { id: number };
}

export interface IProductFilterVariables {
  q?: string;
  provider?: string;
  // user?: string;
  createdAt?: [Dayjs, Dayjs];
  // status?: string;
}

export interface IUserAvatar {
  name: string;
  url: string;
  size: number;
  uid: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: IUserAvatar[];
}

export interface ISubcategory {
  id: number;
  category: ICategories;
  title: string;
  description: string;
  photo: number;
  isActive: boolean;
}

export interface ICategories {
  id: number;
  provider: IProvider;
  title: "string";
  description: "string";
  photo: 0;
  isActive: boolean;
}

export interface IBusinessType {
  id: number;
  name: string;
}

export interface IUnitType {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
  region: IRegion;
}

export interface IRegion {
  id: number;
  nameKz: string;
  nameRu: string;
  nameEn: string;
}

export interface IBrands {
  id: number;
  name: string;
}

export interface IProviderCategory {
  id: number;
  nameKz: string;
  nameRu: string;
  nameEn: string;
  fileId: string;
}

export interface IProvider {
  id: number;
  userId: number;
  businessType: IBusinessType;
  providerCategory: IProviderCategory;
  name: string;
  businessNumber: string;
  phone: string;
  city: ICity;
  address: string;
  businessLicense: number;
  alcoholLicense: number;
  logotype: number;
}
