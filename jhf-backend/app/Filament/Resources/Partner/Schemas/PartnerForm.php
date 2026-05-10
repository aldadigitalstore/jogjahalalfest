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
                        'Support Lembaga Negara' => 'Support Lembaga Negara',
                        'Support Pemerintah' => 'Support Pemerintah',
                        'Support Universitas' => 'Support Universitas',
                        'Support Asosiasi' => 'Support Asosiasi',
                        'Support Organisasi Masyarakat' => 'Support Organisasi Masyarakat',
                        'Support Media' => 'Support Media',
                        'Sponsor' => 'Sponsor',
                    ])
                    ->required(),
                FileUpload::make('logo')
                    ->image()
                    ->disk('public')
                    ->directory('partners')
                    ->visibility('public'),
            ]);
    }
}
