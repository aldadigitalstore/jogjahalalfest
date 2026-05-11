<?php

namespace App\Filament\Resources\Partner\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PartnerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Select::make('category')
                    ->options([
                        'Hosted By' => 'Hosted By',
                        'Co-Host' => 'Co-Host',
                        'Partner' => 'Partner',
                        'Support By' => 'Support By',
                    ])
                    ->required(),
                FileUpload::make('logo')
                    ->image()
                    ->imageEditor()
                    ->disk('public')
                    ->directory('partners')
                    ->visibility('public'),
            ]);
    }
}
