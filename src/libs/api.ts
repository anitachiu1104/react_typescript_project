import axios, { AxiosInstance } from 'axios';
import {
  LongShortIndex,
  SocialMedia,
  SocialMediaHistory,
  SocialMediaLatest,
  StablecoinSupplyRatio,
  StablecoinTotalSupply,
} from '../types';
import { LongShortIndexResponse } from './api.type';

function socialToPath(social: string): string | undefined {
  if (['telegram'].includes(social.toLocaleLowerCase())) {
    return social.toLowerCase();
  }
  return undefined;
}

type SocialMediaLatestResponse = [number, number, string, number];

export class Api {
  constructor(public client: AxiosInstance) {}

  async getLongShortIndex(abbr: string): Promise<LongShortIndex[]> {
    const { data } = await this.client.get<LongShortIndexResponse>(`/${abbr}`);
    return data.map((item) => ({
      abbr,
      coinPrice: Number(item[0]),
      bidsTotalVolume: item[1],
      asksTotalVolume: item[2],
      bidsRatio: Number(item[3]),
      timestamp: item[4],
    }));
  }

  async getSocialMediaNameList(params: { social: string }): Promise<SocialMedia[]> {
    const path = socialToPath(params.social);

    if (path === undefined) {
      return [];
    }

    const { data } = await this.client.get<[string, string, number][]>(`/${path}nameandid`);

    return data.map((item) => ({
      id: item[1],
      name: item[0],
      available: item[2] === 1,
    }));
  }

  async getSocialMediaLatest(params: { social: string }): Promise<SocialMediaLatest[]> {
    const path = socialToPath(params.social);

    if (path === undefined) {
      return [];
    }

    const [nameList, { data }] = await Promise.all([
      this.getSocialMediaNameList(params),
      this.client.get<SocialMediaLatestResponse[][]>(`/${path}latest`),
    ]);

    return data.map<SocialMediaLatest>((item) => {
      const latest = item[0];
      const id = latest[2];
      const totalMember = latest[1];
      const compared = item.length >= 3 ? item[2] : undefined;
      const changeNumber = compared === undefined ? 0 : totalMember - compared[1];
      const changeRatio = changeNumber === 0 ? 0 : changeNumber / totalMember;
      const socialMedia = nameList.find((i) => i.id === id);

      return {
        id,
        onlineMember: latest[0],
        totalMember,
        changeNumber,
        changeRatio,
        name: 'Unknown',
        available: false,
        ...socialMedia,
      };
    });
  }

  async getSocialMediaHistory(params: { id: string }): Promise<SocialMediaHistory[]> {
    const { data } = await this.client.get<[number, number, string, number][]>(`/${params.id}`);
    return data.map((item) => ({
      onlineMember: item[0],
      totalMember: item[1],
      creationTime: item[3],
    }));
  }

  async getStablecoinSupplyRatio(): Promise<StablecoinSupplyRatio[]> {
    const { data } = await this.client.get<[number, number][]>('/ssration');
    return data.map((item) => ({
      ratio: item[1],
      creationTime: item[0],
    }));
  }

  async getStablecoinTotalSupply(stablecoin: string): Promise<StablecoinTotalSupply[]> {
    const { data } = await this.client.get<[number, number][]>(`/ssr${stablecoin}`);
    return data.map((item) => ({
      totalSupply: item[1],
      creationTime: item[0],
    }));
  }
}

export const api = new Api(
  axios.create({
    baseURL: 'https://api.bctrend.com',
  }),
);
