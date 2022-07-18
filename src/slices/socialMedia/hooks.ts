import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { SocialMediaLatest } from '../../types';
import { socialMediaActions } from './actions';

export function useSocialMediaLatest(social?: string): {
  getSocialMediaLatest: () => void;
  loading: boolean;
  socialMediaLatest: SocialMediaLatest[];
} {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { socialMediaLatest } = useAppSelector((state) => state.socialMedia);

  const getSocialMediaLatest = useCallback(async () => {
    if (social === undefined) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(socialMediaActions.getSocialMediaLatest({ social }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, social]);

  return useMemo(() => {
    const list = (social !== undefined ? socialMediaLatest[social] : undefined) ?? [];

    return {
      getSocialMediaLatest,
      loading,
      socialMediaLatest: list.slice().sort((a, b) => b.totalMember - a.totalMember),
    };
  }, [getSocialMediaLatest, loading, social, socialMediaLatest]);
}
