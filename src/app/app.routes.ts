import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LinhasComponent } from './pages/linhas/linhas.component';
import { PontosComponent } from './pages/pontos/pontos.component';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'cadastro', component: CadastroComponent, canActivate: [authGuard]},
    { path: 'linhas', component: LinhasComponent, canActivate: [authGuard]},
    { path: 'indicadores', component: IndicadoresComponent, canActivate: [authGuard]},
    { path: ' ', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];