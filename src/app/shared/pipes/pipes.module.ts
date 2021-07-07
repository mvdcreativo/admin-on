import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterNeighborhoodsPipe } from './filter-neighborhoods';
import { FilterStreetsPipe } from './filter-streets.pipe';
import { FilterCityPipe } from './filter-city.pipe';
import { FilterMunicipalityPipe } from './filter-municipality.pipe';
import { DynamicPipePipe } from './dynamic-pipe.pipe';
import { NumberToLetterPipe } from './number-to-letter.pipe';

@NgModule({
    imports: [ 
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        FilterCityPipe,
        FilterMunicipalityPipe,
        DynamicPipePipe,
        NumberToLetterPipe
        
    ],
    exports: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        FilterCityPipe,
        FilterMunicipalityPipe,
        DynamicPipePipe,
        NumberToLetterPipe
        
    ],
    providers: [
        DatePipe
    ]
})
export class PipesModule { }
