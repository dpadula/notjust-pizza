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

  // Fetch the session once, and subscribe to auth state changes
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      }
      setSession(session);
      setLoading(false);
    };
    fetchSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', { event: _event, session });
      setSession(session);
    });
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the profile when the session changes
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
