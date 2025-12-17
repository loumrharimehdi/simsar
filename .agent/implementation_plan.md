# Plan d'Implémentation SaaS Simsar

## Vue d'Ensemble

Transformer Simsar en plateforme SaaS payante pour les professionnels de l'immobilier au Maroc.

### Modèle
- **Visiteurs** : Accès public gratuit aux annonces
- **Professionnels** : Abonnement payant obligatoire pour publier et gérer

---

## Phase 1 : Authentification Supabase

### Tâches

- [ ] **1.1** Créer `src/contexts/AuthContext.tsx`
  - Provider avec état utilisateur
  - Fonctions: login, logout, register, getUser
  - Listener onAuthStateChange

- [ ] **1.2** Créer `src/hooks/useAuth.ts`
  - Hook pour accéder au contexte auth
  - États: user, loading, error

- [ ] **1.3** Créer page `/login`
  - `src/pages/auth/LoginPage.tsx`
  - Formulaire email/password
  - Design premium iOS 26

- [ ] **1.4** Créer page `/register`
  - `src/pages/auth/RegisterPage.tsx`
  - Formulaire inscription pro
  - Champs: email, password, nom entreprise, téléphone, ville

- [ ] **1.5** Créer `src/components/auth/ProtectedRoute.tsx`
  - Wrapper pour routes dashboard
  - Redirection vers /login si non connecté

- [ ] **1.6** Modifier `src/components/Navbar.tsx`
  - Remplacer bouton WhatsApp par:
    - "Espace Pro" si non connecté → /login
    - "Mon Dashboard" si connecté → /dashboard

- [ ] **1.7** Mettre à jour `src/App.tsx`
  - Wrapper AuthProvider
  - Ajouter routes auth et dashboard

---

## Phase 2 : Base de Données

### Tâches

- [ ] **2.1** Créer table `professionals` dans Supabase
  ```sql
  CREATE TABLE professionals (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      email TEXT NOT NULL UNIQUE,
      company_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT,
      logo_url TEXT,
      subscription_status TEXT DEFAULT 'trial',
      subscription_ends_at TIMESTAMP DEFAULT (NOW() + INTERVAL '14 days'),
      created_at TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **2.2** Créer table `clients` dans Supabase
  ```sql
  CREATE TABLE clients (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
      status TEXT DEFAULT 'prospect',
      notes TEXT,
      source TEXT, -- 'whatsapp', 'call', 'website', 'other'
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **2.3** Modifier table `properties`
  ```sql
  ALTER TABLE properties 
  ADD COLUMN professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  ADD COLUMN status TEXT DEFAULT 'active';
  ```

- [ ] **2.4** Configurer Row Level Security (RLS)
  ```sql
  -- Properties: lecture publique, écriture par propriétaire
  ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Public read" ON properties FOR SELECT USING (true);
  CREATE POLICY "Owner insert" ON properties FOR INSERT WITH CHECK (auth.uid() = professional_id);
  CREATE POLICY "Owner update" ON properties FOR UPDATE USING (auth.uid() = professional_id);
  CREATE POLICY "Owner delete" ON properties FOR DELETE USING (auth.uid() = professional_id);
  
  -- Clients: accès propriétaire uniquement
  ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Owner only" ON clients FOR ALL USING (auth.uid() = professional_id);
  
  -- Professionals: lecture/écriture par propriétaire
  ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Owner read" ON professionals FOR SELECT USING (auth.uid() = id);
  CREATE POLICY "Owner update" ON professionals FOR UPDATE USING (auth.uid() = id);
  ```

- [ ] **2.5** Mettre à jour `src/types/database.ts`
  - Ajouter interfaces Professional, Client
  - Mettre à jour interface Property

---

## Phase 3 : Dashboard Layout

### Tâches

- [ ] **3.1** Créer `src/components/dashboard/DashboardLayout.tsx`
  - Layout avec sidebar + header
  - Navigation: Dashboard, Annonces, Clients, Paramètres
  - Profil utilisateur dans header

- [ ] **3.2** Créer `src/components/dashboard/Sidebar.tsx`
  - Menu de navigation
  - Logo Simsar
  - Bouton déconnexion

- [ ] **3.3** Créer `src/pages/dashboard/DashboardPage.tsx`
  - Page d'accueil dashboard
  - Stats cards (annonces actives, vues, clients)
  - Dernières activités

---

## Phase 4 : Gestion Annonces

### Tâches

- [ ] **4.1** Créer `src/pages/dashboard/MyPropertiesPage.tsx`
  - Liste des annonces du pro
  - Filtres par statut
  - Actions: éditer, pause, supprimer

- [ ] **4.2** Créer `src/pages/dashboard/NewPropertyPage.tsx`
  - Formulaire création annonce
  - Upload images (Supabase Storage)
  - Prévisualisation

- [ ] **4.3** Créer `src/pages/dashboard/EditPropertyPage.tsx`
  - Formulaire édition
  - Réutiliser composant formulaire

- [ ] **4.4** Créer `src/hooks/useMyProperties.ts`
  - CRUD properties du pro connecté

- [ ] **4.5** Configurer Supabase Storage
  - Bucket pour images annonces
  - Policies d'upload

---

## Phase 5 : Gestion Clients (CRM)

### Tâches

- [ ] **5.1** Créer `src/pages/dashboard/ClientsPage.tsx`
  - Liste clients avec filtres par statut
  - Recherche par nom/téléphone
  - Ajout rapide client

- [ ] **5.2** Créer `src/pages/dashboard/ClientDetailPage.tsx`
  - Infos client
  - Historique interactions
  - Annonces d'intérêt

- [ ] **5.3** Créer `src/components/dashboard/ClientForm.tsx`
  - Modal/formulaire ajout/édition client

- [ ] **5.4** Créer `src/hooks/useClients.ts`
  - CRUD clients
  - Filtres et recherche

---

## Phase 6 : Paramètres & Profil

### Tâches

- [ ] **6.1** Créer `src/pages/dashboard/SettingsPage.tsx`
  - Modification profil
  - Changement mot de passe
  - Info abonnement

---

## Phase 7 : Polish & UX

### Tâches

- [ ] **7.1** Loading states et skeletons
- [ ] **7.2** Messages toast (succès/erreur)
- [ ] **7.3** Animations transitions
- [ ] **7.4** Responsive mobile dashboard
- [ ] **7.5** Tests unitaires

---

## Ordre d'Exécution Recommandé

1. ✅ Phase 1 (Auth) - Fondation obligatoire
2. ✅ Phase 2 (DB) - Structure données
3. ✅ Phase 3 (Dashboard Layout) - Shell de l'app
4. ✅ Phase 4 (Annonces) - Fonctionnalité principale
5. ✅ Phase 5 (Clients) - CRM
6. ✅ Phase 6 (Settings)
7. ✅ Phase 7 (Polish)

---

## Estimations

| Phase | Durée estimée |
|-------|---------------|
| Phase 1 | 2-3 heures |
| Phase 2 | 1 heure (SQL + types) |
| Phase 3 | 2 heures |
| Phase 4 | 3-4 heures |
| Phase 5 | 2-3 heures |
| Phase 6 | 1 heure |
| Phase 7 | 2 heures |
| **Total** | **~14-16 heures** |
