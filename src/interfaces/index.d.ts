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

export interface ICity {
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
