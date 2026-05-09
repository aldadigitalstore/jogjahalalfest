<?php

namespace App\Filament\Resources\News\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('category')
                    ->default(null),
                RichEditor::make('content')
                    ->default(null)
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'h2',
                        'h3',
                        'paragraph',
                        'small',
                        'lead',
                        'bulletList',
                        'orderedList',
                        'link',
                        'alignStart',
                        'alignCenter',
                        'alignEnd',
                        'alignJustify',
                    ]),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('news')
                    ->visibility('public'),
                DatePicker::make('date'),
            ]);
    }
}
