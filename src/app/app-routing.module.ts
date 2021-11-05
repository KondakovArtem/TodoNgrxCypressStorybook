import { NgModule, NgModuleFactory, Type } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

type LazyModule<T = any> = Type<T> | NgModuleFactory<T>;

export const routes: Routes = [
    {
        path: '',
        loadChildren: (): Promise<LazyModule> =>
            import('./todos/todos.module').then((m) => m.TodosModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
