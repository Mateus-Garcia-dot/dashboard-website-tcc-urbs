import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LinhasComponent } from './pages/linhas/linhas.component';
import { PontosComponent } from './pages/pontos/pontos.component';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: ' ', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cadastro', component: CadastroComponent},
    { path: 'linhas', component: LinhasComponent},
    { path: 'pontos', component: PontosComponent},
    { path: 'indicadores', component: IndicadoresComponent}
];