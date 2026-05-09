<?php

namespace App\Filament\Widgets;

use App\Models\News;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentNews extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    public $tableRecordsPerPage = 5;

    protected function getTableHeading(): string
    {
        return 'Berita Terbaru';
    }

    protected function getTableQuery(): Builder
    {
        return News::query()
            ->orderByDesc('date')
            ->orderByDesc('created_at');
    }

    protected function getTableColumns(): array
    {
        return [
            TextColumn::make('title')
                ->label('Judul')
                ->limit(50)
                ->searchable(),
            TextColumn::make('category')
                ->label('Kategori')
                ->badge()
                ->toggleable(),
            TextColumn::make('date')
                ->label('Tanggal')
                ->date('d M Y')
                ->sortable(),
            TextColumn::make('created_at')
                ->label('Dibuat')
                ->since()
                ->sortable(),
        ];
    }

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('date', 'desc')
            ->striped();
    }
}
