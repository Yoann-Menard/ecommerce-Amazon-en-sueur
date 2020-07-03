<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ArrayExport implements FromArray, WithHeadingRow
{
    protected $array;

    public function __construct(array $array)
    {
        $this->array = $array;
    }

    public function array(): array
    {
        return $this->array;
    }
}
