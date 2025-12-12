import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Profile = {
  avatar_url: string | null;
  full_name: string | null;
  group: string;
  id: string;
  updated_at: string | null;
  username: string | null;
  website: string | null;
};

type AuthData = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log('🚀 ~ AuthProvider ~ isAdmin:', isAdmin);

  useEffect(() => {
    setIsAdmin(profile?.group === 'ADMIN');
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(data || null);
      }
    };

    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
