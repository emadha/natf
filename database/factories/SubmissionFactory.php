<?php

namespace Database\Factories;

use App\Models\Submission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submission>
 */
class SubmissionFactory extends Factory
{
    protected $model = Submission::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isMember = $this->faker->boolean(20); // 20% chance of being in another association
        $bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        $statuses = ['pending', 'accepted', 'rejected'];
        $status = $this->faker->randomElement($statuses);

        return [
            // Personal Information
            'full_name' => $this->faker->name('male'),
            'place_of_birth' => $this->faker->randomElement(['طرابلس التل', 'طرابلس المينا', 'طرابلس الزاهرية', 'عكار', 'المنية', 'الضنية']),
            'civil_registry_number' => (string) $this->faker->numberBetween(10, 999),
            'date_of_birth' => $this->faker->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'residential_address' => $this->faker->randomElement(['شارع العزم، بناية السلام، الطابق الثالث', 'المينا، قرب المرفأ', 'شارع المعرض، شارع 30']),
            'occupation' => $this->faker->randomElement(['مهندس', 'طبيب', 'محامي', 'تاجر', 'أستاذ مدرسي', 'محاسب']),
            'work_address' => $this->faker->randomElement(['شارع المصارف', 'المنطقة الاقتصادية', 'شارع المائتين']),
            'phone_number' => '06' . $this->faker->numberBetween(200000, 999999),
            'mobile_number' => $this->faker->randomElement(['70', '71', '76', '03']) . $this->faker->numberBetween(100000, 999999),
            'educational_level' => $this->faker->randomElement(['إجازة جامعية', 'ماجستير', 'دكتوراه', 'ثانوية عامة']),
            'blood_type' => $this->faker->randomElement($bloodTypes),

            // Other Association Membership
            'is_member_of_other_assoc' => $isMember,
            'other_assoc_name' => $isMember ? 'جمعية ' . $this->faker->realText(20) : null,
            'other_assoc_address' => $isMember ? 'طرابلس - ' . $this->faker->streetName() : null,

            // Document Attachment
            'doc_id_copy' => 'submissions/documents/' . $this->faker->uuid() . '.jpg',

            // Administrative Section
            'status' => $status,
            'decision_number' => $status !== 'pending' ? (string) $this->faker->numberBetween(100, 500) : null,
            'board_meeting_date' => $status !== 'pending' ? $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d') : null,
        ];
    }
}